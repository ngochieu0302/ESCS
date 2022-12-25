#pragma checksum "D:\ESCS\ESCS\Areas\MotorcycleClaim\Views\MotorcycleInvestigation\_MotorcycleClaimCustomerInfo.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "96360ce47b8b27189811b6a870a6a8f109cee207"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotorcycleClaim_Views_MotorcycleInvestigation__MotorcycleClaimCustomerInfo), @"mvc.1.0.view", @"/Areas/MotorcycleClaim/Views/MotorcycleInvestigation/_MotorcycleClaimCustomerInfo.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"96360ce47b8b27189811b6a870a6a8f109cee207", @"/Areas/MotorcycleClaim/Views/MotorcycleInvestigation/_MotorcycleClaimCustomerInfo.cshtml")]
    public class Areas_MotorcycleClaim_Views_MotorcycleInvestigation__MotorcycleClaimCustomerInfo : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalThongTinNguoiLienHe"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" tabindex=""-1"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-lg"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thông tin liên hệ</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                <form name=""frmThongTinNguoiLienHe"" method=""post"">
                    <input type=""hidden"" name=""so_id""");
            BeginWriteAttribute("value", " value=\"", 641, "\"", 649, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n");
            WriteLiteral("                    <input type=\"hidden\" name=\"ma_doi_tac\"");
            BeginWriteAttribute("value", " value=\"", 990, "\"", 998, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                    <div class=""row"">
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label for=""nguon"" class=""_required"">Nguồn thông báo</label>
                                <select class=""select2 form-control custom-select"" required name=""nguon_tb"" style=""width:100%"">
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
                        ");
            WriteLiteral(@"            <input class=""form-control input-small time"" autocomplete=""off"" required name=""gio_tb"" type=""text"" />
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
                                    <input type=""text"" class=""form-control datepicker"" autocomplete=""off"" display-format=""date"" value-format=""number"" required name=""ngay_tb"" placeholder=""mm/dd/yyyy"">
                                    <div class");
            WriteLiteral(@"=""input-group-append"">
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
                                <label class=""_required"">Họ và tên</label>
                                <input type=""text"" class=""form-control"" autocomplete=""off"" required maxlength=""100"" name=""nguoi_tb"" placeholder=""VD: Nguyễn Văn A"">
                            </div>
                        </div>
                        <div cl");
            WriteLiteral(@"ass=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Mối quan hệ với chủ sở hữu xe</label>
                                <select class=""select2 form-control"" required style=""width:100%"" name=""moi_qh_tb"">
                                </select>
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
                                <l");
            WriteLiteral(@"abel class=""_required"">Email</label>
                                <input type=""text"" fn-validate=""validateEmailControl"" autocomplete=""off"" class=""form-control email-inputmask"" required maxlength=""100"" name=""email_tb"" placeholder=""VD: mail@escs.vn"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"">
                        <div class=""col-12"">
                            <h5 class=""m-0 pd-y-10"">Thông tin người liên hệ</h5>
                        </div>
                        <div class=""col-12"">
                            <div class=""custom-control custom-checkbox"">
                                <input type=""checkbox"" class=""custom-control-input"" id=""chkThamGiaLienHeUpdate"">
                                <label class=""custom-control-label font-weight-bold"" for=""chkThamGiaLienHeUpdate"">Tôi là người thông báo và là người liên hệ</label>
                            </div>
                        </div>
       ");
            WriteLiteral(@"             </div>
                    <div class=""row"" style=""margin-top:5px;"">
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Họ và tên</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" required maxlength=""100"" name=""nguoi_lhe"" placeholder=""VD: Nguyễn Văn A"">
                            </div>
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Mối quan hệ với chủ sở hữu xe</label>
                                <select class=""select2 form-control"" style=""width:100%"" required name=""moi_qh_lhe""></select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"">
                        <div class=""col-6"">
                            <d");
            WriteLiteral(@"iv class=""form-group"">
                                <label class=""_required"">Điện thoại</label>
                                <input type=""text"" fn-validate=""validatePhoneControl"" autocomplete=""off"" class=""form-control phone"" required name=""dthoai_lhe"" placeholder=""VD: 0972xxxxxx"">
                            </div>
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Email</label>
                                <input type=""text"" fn-validate=""validateEmailControl"" autocomplete=""off"" class=""form-control email-inputmask"" required maxlength=""100"" name=""email_lhe"" placeholder=""VD: mail@escs.vn"">
                            </div>
                        </div>
                    </div>
                </form>
                
            </div>
            <div class=""modal-footer"">
                <button class=""btn btn-primary btn-sm mg-t-22 wd-90"" type=""but");
            WriteLiteral(@"ton"" id=""btnLuuThongTinNguoiLienHe"">
                    <i class=""fa fa-save""></i>&nbsp;&nbsp;Lưu
                </button>
                <button class=""btn btn-primary btn-sm mg-t-22 wd-90"" type=""button"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close""></i>&nbsp;&nbsp;Đóng
                </button>
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
