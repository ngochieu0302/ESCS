#pragma checksum "D:\ESCS\ESCS\Areas\MotoClaim\Views\MotoCompensation\_MotoCompensationAddBenefit.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "28c34c9f7c8847b3d522334a92350f9545be7d96"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotoClaim_Views_MotoCompensation__MotoCompensationAddBenefit), @"mvc.1.0.view", @"/Areas/MotoClaim/Views/MotoCompensation/_MotoCompensationAddBenefit.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"28c34c9f7c8847b3d522334a92350f9545be7d96", @"/Areas/MotoClaim/Views/MotoCompensation/_MotoCompensationAddBenefit.cshtml")]
    public class Areas_MotoClaim_Views_MotoCompensation__MotoCompensationAddBenefit : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""MotoCompensationAddBenefit"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" tabindex=""-1"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-lg"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thêm người thụ hưởng</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                <form name=""frmMotoCompensationAddBenefit"" method=""post"" id=""frmMotoCompensationAddBenefit"">
                    <input type=""hidden"" name=""so_id"" />
                    <input type=""hidden"" name=""bt"" />
                    <div class=""row"">
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label>Đơn vị thụ hưởng</label>
                                <select class=""select select2 form-contro");
            WriteLiteral("l custom-select\" required name=\"dvi_th\" style=\"width:100%\">\r\n                                    <option");
            BeginWriteAttribute("value", " value=\"", 1128, "\"", 1136, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn đơn vị thụ hưởng</option>
                                    <option value=""GARA"">Gara sửa chữa</option>
                                    <option value=""CUUHO"">Đơn vị cứu hộ</option>
                                    <option value=""KHACHHANG"">Khách hàng</option>
                                </select>
                            </div>
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label");
            BeginWriteAttribute("class", " class=\"", 1664, "\"", 1672, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn số hóa đơn</label>
                                <input type=""text"" class=""form-control"" maxlength=""250"" autocomplete=""off"" placeholder=""Click chọn số hóa đơn"" readonly name=""so_hdon_ttoan"" onclick=""chonSoHoaDon(this)"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Tên đối tượng thụ hưởng</label>
                                <input type=""text"" class=""form-control"" maxlength=""100"" autocomplete=""off"" placeholder=""Tên đối tượng thụ hưởng"" required name=""ten"">
                            </div>
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Phương thức TT</label>
                                ");
            WriteLiteral("<select class=\"select select2 form-control custom-select\" required name=\"pttt\" style=\"width:100%\">\r\n                                    <option");
            BeginWriteAttribute("value", " value=\"", 2840, "\"", 2848, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn phương thức</option>
                                    <option value=""CK"">Chuyển khoản</option>
                                    <option value=""TM"">Tiền mặt</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label class=""_required"">Ngân hàng thụ hưởng</label>
                                <select class=""select select2 form-control custom-select"" required name=""ma_ngan_hang"" style=""width:100%"">
                                </select>
                            </div>
                        </div>
                        <div class=""col-6"">
                            <div class=""form-group"">
                                <label");
            BeginWriteAttribute("class", " class=\"", 3803, "\"", 3811, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chi nhánh ngân hàng thụ hưởng</label>
                                <select class=""select select2 form-control custom-select"" name=""ma_chi_nhanh"" style=""width:100%"">
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Số tài khoản thụ hưởng</label>
                                <input type=""text"" class=""form-control"" maxlength=""20"" autocomplete=""off"" placeholder=""Số tài khoản thụ hưởng"" required name=""tk_cmt"">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Tiền (chưa VAT)</label>
                                <input type=""te");
            WriteLiteral(@"xt"" class=""form-control number"" autocomplete=""off"" placeholder=""Số tiền trước thuế"" required name=""tien_chua_vat"">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Thuế</label>
                                <input type=""text"" class=""form-control number"" autocomplete=""off"" placeholder=""Tiền thuế"" required name=""tien_thue"">
                            </div>
                        </div>

                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Số tiền</label>
                                <input type=""text"" class=""form-control number"" readonly=""readonly"" autocomplete=""off"" placeholder=""Số tiền"" required name=""tien"">
                            </div>
                        </div>
                    </div>
                  ");
            WriteLiteral(@"  <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label class=""_required"">Nội dung</label>
                                <input type=""text"" class=""form-control"" maxlength=""500"" autocomplete=""off"" placeholder=""Nội dung"" required name=""dien_giai"">
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 ml-2"" id=""btnMotoCompensationAddBenefit_save"">
                    <i class=""fas fa-save mr-2""></i>Lưu
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm"" id=""btnMotoCompensationAddBenefit_save_close"">
                    <i class=""fas fa-hdd mr-2""></i>Lưu & đóng
                </button>
                <button class=""btn btn-primary btn-sm");
            WriteLiteral(" wd-85 mg-t-22\" data-dismiss=\"modal\" id=\"btnMotoCompensationReduceReason_close\"><i class=\"fas fa-window-close\"></i>&nbsp;&nbsp;Đóng</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>");
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
