#pragma checksum "D:\ESCS\ESCS\Areas\MotoClaim\Views\_AddInfoLicencse.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "05ff749a0d16b1e5380d7ec3e2b5238fc1885574"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotoClaim_Views__AddInfoLicencse), @"mvc.1.0.view", @"/Areas/MotoClaim/Views/_AddInfoLicencse.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"05ff749a0d16b1e5380d7ec3e2b5238fc1885574", @"/Areas/MotoClaim/Views/_AddInfoLicencse.cshtml")]
    public class Areas_MotoClaim_Views__AddInfoLicencse : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""custom-modal"">
    <div id=""addBenThamGiaGiamDinhModal"" class=""modal fade"" tabindex=""-1"" data-backdrop=""false"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 9999999;width:1025px;top: 2%; left: 16%;"">
        <div class=""modal-dialog modal-lg"" style=""width:70%;max-width:unset; margin-left: 250px;"">
            <div class=""modal-content"" style=""border:3px solid #1e88e5;box-shadow: 1px 8px 10px 0px rgb(106 160 201);"">
                <div class=""modal-header py-1"" style=""background-color:#0069d9; cursor:pointer;border:unset;"">
                    <h5 class=""modal-title"" style=""color:#fff"">Bổ sung bên tham gia giám định</h5>
                    <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
                </div>
                <div class=""modal-body"">
                    <form id=""frmBsBenThamGiaGD"" name=""frmBsBenThamGiaGD"" method=""post"">
                        <input type=""hidden"" name=""ma_doi_tac"" />
                     ");
            WriteLiteral(@"   <input type=""hidden"" name=""so_id"" />
                        <input type=""hidden"" name=""bt"" />
                        <div class=""row"">
                            <div class=""col-6"">
                                <div class=""form-group"">
                                    <label class=""_required"">Người đại diện là</label>
                                    <select class=""form-control select2"" style=""width:100%"" required name=""dai_dien""></select>
                                </div>
                            </div>
                            <div class=""col-6"">
                                <div class=""form-group"">
                                    <label class=""_required"">Họ tên người đại diện</label>
                                    <input type=""text"" class=""form-control"" autocomplete=""off"" required name=""ten"" placeholder=""Họ tên người đại diện"">
                                </div>
                            </div>
                        </div>
                      ");
            WriteLiteral(@"  <div class=""row"">
                            <div class=""col-12"">
                                <div class=""form-group"">
                                    <label>Địa chỉ</label>
                                    <input type=""text"" class=""form-control"" autocomplete=""off"" name=""dia_chi"" placeholder=""Địa chỉ"">
                                </div>
                            </div>
                        </div>
                        <div class=""row"">
                            <div class=""col-6"">
                                <div class=""form-group"">
                                    <label>Điện thoại</label>
                                    <input type=""text"" fn-validate=""validatePhoneControl"" class=""form-control phone"" autocomplete=""off"" name=""dien_thoai"" placeholder=""Số điện thoại"">
                                </div>
                            </div>
                            <div class=""col-6"">
                                <div class=""form-group"">
             ");
            WriteLiteral(@"                       <label>Email</label>
                                    <input type=""text"" fn-validate=""validateEmailControl"" class=""form-control email-inputmask"" autocomplete=""off"" name=""email"" placeholder=""Email"">
                                </div>
                            </div>
                        </div>
                        <div class=""row"">
                            <div class=""col-12"">
                                <div class=""form-group"">
                                    <label class=""_required"">Lần giám định</label>
                                    <select class=""form-control select2"" style=""width:100%"" required name=""lan_gd""></select>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class=""modal-footer"" style=""display:block;"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" data-dismi");
            WriteLiteral(@"ss=""modal"">
                        <i class=""fas fa-window-close mr-2""></i>Đóng
                    </button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" id=""btnLuuBsBenThamGiaGD"">
                        <i class=""fa fa-save""></i>&nbsp;&nbsp;Lưu
                    </button>
                    <button type=""button"" class=""btn btn-primary btn-sm float-right"" id=""btnLuuDongBsBenThamGiaGD"">
                        <i class=""fa fa-hdd mr-2""></i>Lưu & đóng
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class=""custom-modal"">
    <div id=""addLicenseInfoModal"" class=""modal fade"" tabindex=""-1"" data-backdrop=""false"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 9999999;width:1025px;top: 2%; left: 16%;"">
        <div class=""modal-dialog modal-lg"" style=""width:70%;max-width:unset; margin-left: 250px;"">
            <div class=""modal-content"" style=""border:3px solid #1");
            WriteLiteral(@"e88e5;box-shadow: 1px 8px 10px 0px rgb(106 160 201);"">
                <div class=""modal-header py-1"" style=""background-color:#0069d9; cursor:pointer;border:unset;"">
                    <h5 class=""modal-title"" style=""color:#fff"">Bổ sung thông tin GPLX</h5>
                    <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
                </div>
                <div class=""modal-body"">
                    <form id=""frmAddLicenseInfo"" name=""frmAddLicenseInfo"" method=""post"">
                        <input type=""hidden"" name=""so_id""");
            BeginWriteAttribute("value", " value=\"", 5701, "\"", 5709, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                        <div class=""row"">
                            <div class=""col-4"">
                                <div class=""form-group"">
                                    <label class=""_required"">Chọn đối tượng tổn thất</label>
                                    <div class=""input-group"">
                                        <select class=""select2 form-control custom-select"" required name=""so_id_doi_tuong"" style=""width:100%"">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class=""col-8"">
                                <div class=""form-group"">
                                    <label class=""_required"">Chọn vụ tổn thất</label>
                                    <div class=""input-group"">
                                        <select class=""select2 form-control custom-select"" required name=""vu_tt"" style=""width:100%"">
      ");
            WriteLiteral(@"                                  </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""row"">
                            <div class=""col-4"">
                                <div class=""form-group"">
                                    <label class=""_required"">Họ tên lái xe</label>
                                    <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Họ tên lái xe"" required name=""ten_lxe"">
                                </div>
                            </div>
                            <div class=""col-4"">
                                <div class=""form-group"">
                                    <label>Điện thoại</label>
                                    <div class=""input-group"">
                                        <input type=""text"" fn-validate=""validatePhoneControl"" class=""form-control phone"" placeholder=""Đ");
            WriteLiteral(@"iện thoại"" name=""dthoai_lxe"">
                                        <div class=""input-group-append"">
                                            <label class=""input-group-text"" for=""dthoai_lxe"">
                                                <a href=""#"" id=""call_dthoai_lxe"">
                                                    <i class=""fal fa-phone-rotary"" title=""Thông tin liên hệ""></i>
                                                </a>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=""col-4"">
                                <div class=""form-group"">
                                    <label>Email</label>
                                    <input type=""text"" fn-validate=""validateEmailControl"" class=""form-control email-inputmask"" placeholder=""Email"" autocomplete=""off"" name=""email_lxe"">
");
            WriteLiteral(@"                                </div>
                            </div>
                        </div>
                        <div class=""row"">
                            <div class=""col-3"">
                                <div class=""form-group"">
                                    <label class=""_required"">Số GPLX</label>
                                    <input type=""text"" class=""form-control"" placeholder=""Số GPLX"" autocomplete=""off"" required name=""gplx_so"">
                                </div>
                            </div>
                            <div class=""col-3"">
                                <div class=""form-group"">
                                    <label class=""_required"">Hạng GPLX</label>
                                    <input type=""text"" readonly class=""form-control"" name=""gplx_hang"" onclick=""ChonHangGPLX(this)"" placeholder=""Hạng giấy phép lái xe"">
                                </div>
                            </div>
                            <div clas");
            WriteLiteral(@"s=""col-3"">
                                <div class=""form-group"">
                                    <label class=""_required"">Ngày cấp GPLX</label>
                                    <div class=""input-group"">
                                        <input type=""text"" class=""form-control datepicker"" display-format=""date"" value-format=""number"" required data-drops=""up"" name=""gplx_hieu_luc"" placeholder=""mm/dd/yyyy"">
                                        <div class=""input-group-append"">
                                            <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=""col-3"">
                                <div class=""form-group"">
                                    <label class=""gplx_het_han"">Ngày hết hạn</label>
                                    <div class=");
            WriteLiteral(@"""input-group"">
                                        <input type=""text"" class=""form-control datepicker"" display-format=""date"" value-format=""number"" data-drops=""up"" name=""gplx_het_han"" placeholder=""mm/dd/yyyy"">
                                        <div class=""input-group-append"">
                                            <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class=""modal-footer"" style=""display:block;"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" data-dismiss=""modal"" id=""btnCloseAddLicenseInfo"">
                        <i class=""fas fa-window-close mr-2""></i>Đóng
                    </button>
                    <button type=""button"" class=""btn btn");
            WriteLiteral(@"-primary btn-sm wd-85 float-right"" id=""btnLuuAddLicenseInfo"">
                        <i class=""fa fa-save""></i>&nbsp;&nbsp;Lưu
                    </button>
                    <button type=""button"" class=""btn btn-primary btn-sm float-right"" id=""btnLuuCloseAddLicenseInfo"">
                        <i class=""fa fa-hdd mr-2""></i>Lưu & đóng
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class=""custom-modal"">
    <div id=""addRegistryInfoModal"" class=""modal fade"" tabindex=""-1"" data-backdrop=""false"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 9999999;width:1025px;top: 2%; left: 16%;"">
        <div class=""modal-dialog modal-lg"" style=""width:70%;max-width:unset; margin-left: 250px;"">
            <div class=""modal-content"" style=""border:3px solid #1e88e5;box-shadow: 1px 8px 10px 0px rgb(106 160 201);"">
                <div class=""modal-header py-1"" style=""background-color:#0069d9; cursor:pointer;border:unset;"">
");
            WriteLiteral(@"                    <h5 class=""modal-title"" style=""color:#fff"">Bổ sung thông tin đăng kiểm</h5>
                    <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
                </div>
                <div class=""modal-body"">
                    <form id=""frmAddRegistryInfo"" name=""frmAddRegistryInfo"" method=""post"">
                        <input type=""hidden"" name=""so_id""");
            BeginWriteAttribute("value", " value=\"", 13298, "\"", 13306, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                        <div class=""row"">
                            <div class=""col-4"">
                                <div class=""form-group"">
                                    <label class=""_required"">Chọn đối tượng tổn thất</label>
                                    <div class=""input-group"">
                                        <select class=""select2 form-control custom-select"" required name=""so_id_doi_tuong"" style=""width:100%"">
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div class=""col-8"">
                                <div class=""form-group"">
                                    <label class=""_required"">Chọn vụ tổn thất</label>
                                    <div class=""input-group"">
                                        <select class=""select2 form-control custom-select"" required name=""vu_tt"" style=""width:100%"">
      ");
            WriteLiteral(@"                                  </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""row"">
                            <div class=""col-4"">
                                <div class=""form-group"">
                                    <label class=""_required"">Số đăng kiểm</label>
                                    <input type=""text"" placeholder=""Số đăng kiểm"" class=""form-control"" autocomplete=""off"" required name=""dangkiem_so"">
                                </div>
                            </div>
                            <div class=""col-4"">
                                <div class=""form-group"">
                                    <label class=""_required"">Ngày cấp</label>
                                    <div class=""input-group"">
                                        <input type=""text"" class=""form-control datepicker"" display-format=""date"" valu");
            WriteLiteral(@"e-format=""number"" required data-drops=""up"" name=""dangkiem_hieu_luc"" placeholder=""mm/dd/yyyy"">
                                        <div class=""input-group-append"">
                                            <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class=""col-4"">
                                <div class=""form-group"">
                                    <label class=""_required"">Ngày hết hạn</label>
                                    <div class=""input-group"">
                                        <input type=""text"" class=""form-control datepicker"" display-format=""date"" value-format=""number"" required data-drops=""up"" name=""dangkiem_het_han"" placeholder=""mm/dd/yyyy"">
                                        <div class=""input-group-append"">
                                ");
            WriteLiteral(@"            <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div class=""modal-footer"" style=""display:block;"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" data-dismiss=""modal"" id=""btnCloseAddRegistryInfo"">
                        <i class=""fas fa-window-close mr-2""></i>Đóng
                    </button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" id=""btnLuuAddRegistryInfo"">
                        <i class=""fa fa-save""></i>&nbsp;&nbsp;Lưu
                    </button>
                    <button type=""button"" class=""btn btn-primary btn-sm float-right"" id=""btnLuuCloseAddRegistryInfo"">
                        <i class=""fa f");
            WriteLiteral("a-hdd mr-2\"></i>Lưu & đóng\r\n                    </button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
