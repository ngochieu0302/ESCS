#pragma checksum "D:\ESCS\ESCS\Areas\MotorcycleClaim\Views\MotorcycleCompensation\_MotorcycleCompensationAddInvoice.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "5946bc837ba646d2075e68139b573b8b5cb67383"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotorcycleClaim_Views_MotorcycleCompensation__MotorcycleCompensationAddInvoice), @"mvc.1.0.view", @"/Areas/MotorcycleClaim/Views/MotorcycleCompensation/_MotorcycleCompensationAddInvoice.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"5946bc837ba646d2075e68139b573b8b5cb67383", @"/Areas/MotorcycleClaim/Views/MotorcycleCompensation/_MotorcycleCompensationAddInvoice.cshtml")]
    public class Areas_MotorcycleClaim_Views_MotorcycleCompensation__MotorcycleCompensationAddInvoice : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""CarCompensationAddInvoice"" class=""modal fade"" data-backdrop=""static"" data-keyboard=""false"" tabindex=""-1"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-lg"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thêm hóa đơn, chứng từ</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"">
                <form name=""frmCarCompensationAddInvoice"" id=""frmCarCompensationAddInvoice"" method=""post"">
                    <input type=""hidden"" name=""so_id"" />
                    <input type=""hidden"" name=""bt"" />
                    <div class=""row"">
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Đơn vị phát hành</label>
                                <select class=""select se");
            WriteLiteral("lect2 form-control custom-select\" required name=\"dvi_ph\" style=\"width:100%\">\r\n                                    <option");
            BeginWriteAttribute("value", " value=\"", 1145, "\"", 1153, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn đơn vị phát hành</option>
                                    <option value=""GARA"">Gara sửa chữa</option>
                                    <option value=""CUUHO"">Đơn vị cứu hộ</option>
                                    <option value=""KHACHHANG"">Khách hàng</option>
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
                             ");
            WriteLiteral(@"   <label class=""_required"">Mã số thuế</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" placeholder=""Mã số thuế"" required name=""mst_dvi_phat_hanh"">
                            </div>
                        </div>
                        <div class=""col-9"">
                            <div class=""form-group"">
                                <label class=""_required"">Địa chỉ</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" placeholder=""Địa chỉ"" required name=""dchi_dvi_phat_hanh"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Ngày phát hành</label>
                                <div class=""input-group"">
                                    ");
            WriteLiteral(@"<input type=""text"" autocomplete=""off"" class=""form-control datepicker"" display-format=""date"" value-format=""number"" required name=""ngay_ct"" placeholder=""dd/mm/yyyy"">
                                    <div class=""input-group-append"">
                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Mẫu hóa đơn</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" required name=""mau_hdon"" placeholder=""GT00001..."">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <labe");
            WriteLiteral(@"l class=""_required"">Ký hiệu hóa đơn</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" required name=""ky_hieu_hdon"" placeholder=""AP/20..."">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Số hóa đơn</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" required name=""so_hdon"" placeholder=""0000001"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label class=""_required"">Nội dung</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" placeholder=""Nội dung"" requ");
            WriteLiteral(@"ired name=""dien_giai"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Số tiền</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control number"" placeholder=""Số tiền"" required name=""tien"">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Tỷ lệ thuế (%)</label>
                                <select class=""select select2 form-control custom-select"" required name=""tl_thue"" style=""width:100%"">
                                </select>
                            </div>
                        </div>
                        <div cla");
            WriteLiteral(@"ss=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Thuế</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control decimal"" placeholder=""Thuế"" required name=""thue"">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Tổng cộng</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control number"" placeholder=""Tổng tiền"" readonly required name=""tong_cong"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-9"">
                            <div class=""form-group"">
                                <label>Tên đơn vị nhận hóa đơn</label>
              ");
            WriteLiteral(@"                  <input type=""text"" autocomplete=""off"" class=""form-control"" placeholder=""Tên đơn vị nhận hóa đơn"" name=""ten_dvi_nhan"">
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label>MST đơn vị nhận hóa đơn</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" placeholder=""MST đơn vị nhận hóa đơn"" name=""mst_dvi_nhan"">
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:8px"">
                        <div class=""col-12"">
                            <div class=""form-group"">
                                <label>Địa chỉ đơn vị nhận hóa đơn</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" placeholder=""Địa chỉ đơn vị nhận hóa đơn"" name=""dchi_dvi_nhan"">
       ");
            WriteLiteral(@"                     </div>
                        </div>

                    </div>
                </form>

            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn btn-primary btn-sm wd-80 ml-2"" id=""btnCarCompensationAddInvoice_save"">
                    <i class=""fas fa-save""></i>&nbsp;&nbsp;Lưu
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm ml-2"" id=""btnCarCompensationAddInvoice_save_close"">
                    <i class=""fas fa-save""></i>&nbsp;&nbsp;Lưu và đóng
                </button>
                <button class=""btn btn-primary btn-sm wd-90 mg-t-22"" data-dismiss=""modal"" id=""btnCarCompensationReduceReason_close""><i class=""fas fa-window-close""></i>&nbsp;&nbsp;Đóng</button>
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
