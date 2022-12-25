#pragma checksum "D:\ESCS\ESCS\Areas\OtherClaim\Views\Claim\_OtherClaimSearch.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c429110b9da44a3dcc1200b61df3adf8a4042237"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_OtherClaim_Views_Claim__OtherClaimSearch), @"mvc.1.0.view", @"/Areas/OtherClaim/Views/Claim/_OtherClaimSearch.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c429110b9da44a3dcc1200b61df3adf8a4042237", @"/Areas/OtherClaim/Views/Claim/_OtherClaimSearch.cshtml")]
    public class Areas_OtherClaim_Views_Claim__OtherClaimSearch : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalOtherSearch"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"">
    <div class=""modal-dialog modal-lg"" style=""max-width:unset;width:55%;"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thêm hồ sơ</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" onclick=""hideModalTimKiemDoiTuong()"" aria-hidden=""true"">×</button>
            </div>
            <div class=""card border mb-0 p-2"">
                <div class=""card-body"" style=""padding:0px;"" id=""navTabTimKiemDoiTuong"">
                    <ul class=""cd-breadcrumb triangle nav nav-tabs"" role=""tablist"">
                        <li role=""presentation"" onclick=""changeTabTKiemDoiTuong('tabTimKiemXe')"" id=""Tab_tabTimKiemDoiTuong"">
                            <a href=""#Tab_tabTimKiemDoiTuong"" aria-controls=""changeTabTKiemDoiTuong"" role=""tab"" data-toggle=""tab"" aria-expanded=""false"" aria-se");
            WriteLiteral(@"lected=""true"">
                                <span class=""fa fa-car mr-2""></span>Thông tin đối tượng
                            </a>
                        </li>
                        <li role=""presentation"" onclick=""changeTabTKiemDoiTuong('tabThongTinLienHe')"">
                            <a href=""#Tab_tabThongTinLienHe"" aria-controls=""stepThongTinGiamDinh"" role=""tab"" data-toggle=""tab"" aria-expanded=""false"" aria-selected=""false"">
                                <span class=""fa fa-user mr-2""></span>Thông tin người thông báo
                            </a>
                        </li>
                    </ul>
                    <div class=""tab-content"">
                        <div class=""tab-pane active"" role=""tabpanel"" id=""tabTimKiemDoiTuong"">
                            <form name=""frmOtherClaimSearch"" method=""post"">
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <div class=""form-group");
            WriteLiteral(@""">
                                            <label class=""_required"">Công ty</label>
                                            <select class=""select2 form-control custom-select"" required name=""ma_doi_tac"" style=""width:100%"">
                                                <option");
            BeginWriteAttribute("value", " value=\"", 2336, "\"", 2344, 0);
            EndWriteAttribute();
            WriteLiteral(@" selected>Chọn đối tác</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label");
            BeginWriteAttribute("class", " class=\"", 2698, "\"", 2706, 0);
            EndWriteAttribute();
            WriteLiteral(">Đơn vị</label>\r\n                                            <select class=\"select2 form-control custom-select\" name=\"ma_chi_nhanh\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 2915, "\"", 2923, 0);
            EndWriteAttribute();
            WriteLiteral(@" selected>Chọn chi nhánh</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Số hợp đồng</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Số hợp đồng"" name=""so_hdong"">
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Số GCN bảo hiểm</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Số");
            WriteLiteral(@" giấy chứng nhận"" name=""gcn"">
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Tên đối tượng</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Tên đối tượng"" name=""ten_doi_tuong"">
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label for=""nv"">Nghiệp vụ</label>
                                            <select class=""select2 form-control custom-select"" name=""nv"" style=""width:100%"">
                                                <option");
            BeginWriteAttribute("value", " value=\"", 4897, "\"", 4905, 0);
            EndWriteAttribute();
            WriteLiteral(@" selected>Chọn nghiệp vụ</option>
                                                <option value=""TAI_SAN"">Tài sản</option>
                                                <option value=""KY_THUAT"">Kỹ thuật</option>
                                                <option value=""HON_HOP"">Hỗn hợp</option>
                                                <option value=""TRACH_NHIEM"">Trách nhiệm</option>
                                                <option value=""HANG_HOA"">Hàng hóa</option>
                                                <option value=""TAU_THUYEN"">Tàu thuyền</option>
                                                <option value=""XE_MAY"">Xe gắn máy</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-3"">
                                        <div");
            WriteLiteral(@" class=""form-group"">
                                            <label for=""ngay_d"" class=""_required"">Ngày xảy ra tổn thất</label>
                                            <div class=""input-group"">
                                                <input type=""text"" autocomplete=""off"" class=""form-control datepicker_max"" required name=""ngay_xr"" placeholder=""dd/mm/yyyy"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-2"">
                                        <button type=""button"" class=""btn btn-primary btn-sm mg-t-22"" id=""btnOtherSearch""><i class=""fa fa-search mr-2""></i>Tìm kiếm</button>
         ");
            WriteLiteral(@"                           </div>
                                </div>
                            </form>
                            <div class=""row"">
                                <div class=""col-12 mt-3"">
                                    <div class=""table-responsive"" style=""max-height: 230px;"">
                                        <table id=""tableDsHoSoGiayTo"" class=""table table-bordered fixed-header"" style=""width:150%"">
                                            <thead class=""font-weight-bold text-center uppercase"">
                                                <tr>
                                                    <th style=""width:150px"">Số hợp đồng</th>
                                                    <th style=""width:200px"">Tên đối tượng</th>
                                                    <th style=""width:180px"">Số giấy chứng nhận</th>
                                                    <th style=""width:150px"">Nghiệp vụ</th>
                                         ");
            WriteLiteral(@"           <th style=""width:225px"">Hiệu lực bảo hiểm</th>
                                                    <th>Ngành nghề kinh doanh</th>
                                                    <th>Đơn vị cấp đơn</th>
                                                </tr>
                                            </thead>
                                            <tbody id=""modalOtherSearchDsGCN"">
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""tab-pane"" role=""tabpanel"" id=""tabThongTinLienHe"">
                            <form name=""frmOtherClaimCustomerInfo"" method=""post"">
                                <input type=""hidden"" name=""so_id""");
            BeginWriteAttribute("value", " value=\"", 8878, "\"", 8886, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"so_hs\"");
            BeginWriteAttribute("value", " value=\"", 8957, "\"", 8965, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n\r\n                                <input type=\"hidden\" name=\"nv\"");
            BeginWriteAttribute("value", " value=\"", 9035, "\"", 9043, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"ma_doi_tac\"");
            BeginWriteAttribute("value", " value=\"", 9119, "\"", 9127, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"ma_chi_nhanh\"");
            BeginWriteAttribute("value", " value=\"", 9205, "\"", 9213, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"so_id_hd\"");
            BeginWriteAttribute("value", " value=\"", 9287, "\"", 9295, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"so_id_dt\"");
            BeginWriteAttribute("value", " value=\"", 9369, "\"", 9377, 0);
            EndWriteAttribute();
            WriteLiteral(@" />

                                <div class=""row"">
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Giờ thông báo</label>
                                            <div class=""input-group bootstrap-timepicker timepicker"">
                                                <input class=""form-control input-small time"" required name=""gio_tb"" type=""text"" autocomplete=""off"" />
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text"">
                                                        <span class=""ti-calendar""></span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                      ");
            WriteLiteral(@"              </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Ngày thông báo</label>
                                            <div class=""input-group"">
                                                <input type=""text"" class=""form-control datepicker_max"" display-format=""date"" value-format=""number"" required name=""ngay_tb"" placeholder=""mm/dd/yyyy"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                   ");
            WriteLiteral(@"                 <div class=""col-12"">
                                        <h5 class=""m-0 pd-y-10"">Thông tin người thông báo</h5>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Mối quan hệ với chủ sở hữu</label>
                                            <select class=""select2 form-control"" required style=""width:100%"" name=""moi_qh_tb"">
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Họ và tên</label>
                                        ");
            WriteLiteral(@"    <input type=""text"" class=""form-control"" autocomplete=""off"" required maxlength=""100"" name=""nguoi_tb"" placeholder=""VD: Nguyễn Văn A"">
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Điện thoại</label>
                                            <input type=""text"" fn-validate=""validatePhoneControl"" autocomplete=""off"" class=""form-control phone"" required name=""dthoai_tb"" placeholder=""VD: 0972xxxxxx"">
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label>Email</label>
          ");
            WriteLiteral(@"                                  <input type=""text"" fn-validate=""validateEmailControl"" autocomplete=""off"" class=""form-control email-inputmask"" maxlength=""100"" name=""email_tb"" placeholder=""VD: mail@escs.vn"">
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-12"">
                                        <h5 class=""m-0 pd-y-10"">Thông tin người liên hệ</h5>
                                    </div>
                                    <div class=""col-12"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input class=""custom-control-input"" type=""checkbox"" id=""chkThamGiaLienHe"" value=""option1"">
                                            <label class=""custom-control-label"" for=""chkThamGiaLienHe"" style=""font-size:12px""><b style=""font-weight:bold"">Tô");
            WriteLiteral(@"i là người thông báo và là người liên hệ</b></label>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"" style=""margin-top:5px;"">
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Mối quan hệ với chủ sở hữu</label>
                                            <select class=""select2 form-control"" style=""width:100%"" required name=""moi_qh_lhe""></select>
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Họ và tên</label>
                                            <input type=""text"" class=""form-control"" autocomple");
            WriteLiteral(@"te=""off"" required maxlength=""100"" name=""nguoi_lhe"" placeholder=""VD: Nguyễn Văn A"">
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Điện thoại</label>
                                            <input type=""text"" fn-validate=""validatePhoneControl"" class=""form-control phone"" autocomplete=""off"" required name=""dthoai_lhe"" placeholder=""VD: 0972xxxxxx"">
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label>Email</label>
                                            <input type=""text""");
            WriteLiteral(@" fn-validate=""validateEmailControl"" autocomplete=""off"" class=""form-control email-inputmask"" maxlength=""100"" name=""email_lhe"" placeholder=""VD: mail@escs.vn"">
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-primary btn-sm"" id=""btnTiepTheo"">
                    Tiếp theo &nbsp;&nbsp;<i class=""fas fa-chevron-right""></i>
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 mg-t-22"" onclick=""hideModalTimKiemDoiTuong()"" data-dismiss=""modal"" id=""modalOtherSearch_close""><i class=""fas fa-window-close""></i>&nbsp;&nbsp;Đóng</button>
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
