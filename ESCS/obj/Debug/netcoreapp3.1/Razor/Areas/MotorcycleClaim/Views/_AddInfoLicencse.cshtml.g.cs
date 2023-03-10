#pragma checksum "D:\ESCS\ESCS\Areas\MotorcycleClaim\Views\_AddInfoLicencse.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "39c50b6d868a6ad4249953cbbff5c3dd0223ea0c"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotorcycleClaim_Views__AddInfoLicencse), @"mvc.1.0.view", @"/Areas/MotorcycleClaim/Views/_AddInfoLicencse.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"39c50b6d868a6ad4249953cbbff5c3dd0223ea0c", @"/Areas/MotorcycleClaim/Views/_AddInfoLicencse.cshtml")]
    public class Areas_MotorcycleClaim_Views__AddInfoLicencse : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral("<div id=\"AddBenThamGiaGiamDinh\" class=\"popover popover-x popover-default\" style=\"display:none; max-width:700px\">\r\n");
            WriteLiteral(@"    <h3 class=""popover-header popover-title"">
        <span class=""close pull-right"" data-dismiss=""popover-x"">&times;</span>Bổ sung bên tham gia giám định
    </h3>
    <div class=""popover-body popover-content"">
        <form id=""frmBsBenThamGiaGD"" name=""frmBsBenThamGiaGD"" method=""post"">
            <input type=""hidden"" name=""ma_doi_tac"" />
            <input type=""hidden"" name=""so_id"" />
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
                        <input type=""text"" class=""form-co");
            WriteLiteral(@"ntrol"" autocomplete=""off"" required name=""ten"" placeholder=""Họ tên người đại diện"">
                    </div>
                </div>
            </div>
            <div class=""row"">
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
                        <label>Email</l");
            WriteLiteral(@"abel>
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
    <div class=""popover-footer"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-90 mg-t-22"" id=""btnLuuBsBenThamGiaGD"">
            <i class=""fa fa-save""></i>&nbsp;&nbsp;Lưu
        </button>
        <button type=""button"" class=""btn btn-primary btn-sm wd-90 mg-t-22"" data-dismiss=""popover-x"">
            <i class=""fa fa-save""></i>&nbsp;&nbsp;Đóng
     ");
            WriteLiteral("   </button>\r\n    </div>\r\n</div>\r\n\r\n<div id=\"AddLicenseInfo\" class=\"popover popover-x popover-default\" style=\"display:none; max-width:600px\" >\r\n");
            WriteLiteral(@"    <h3 class=""popover-header popover-title"">
        <span class=""close pull-right"" data-dismiss=""popover-x"">&times;</span>Bổ sung thông tin GPLX
    </h3>
    <div class=""popover-body popover-content"">
        <form id=""frmAddLicenseInfo"" name=""frmAddLicenseInfo"" method=""post"">
            <input type=""hidden"" name=""so_id""");
            BeginWriteAttribute("value", " value=\"", 3731, "\"", 3739, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
            <div class=""row"">
                <div class=""col-12"">
                    <div class=""form-group"">
                        <label class=""_required"">Chọn vụ tổn thất</label>
                        <div class=""input-group"">
                            <select class=""select2 form-control custom-select"" required name=""vu_tt"" style=""width:100%"">
                            </select>
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
  ");
            WriteLiteral(@"                      <div class=""input-group"">
                            <input type=""text"" fn-validate=""validatePhoneControl"" class=""form-control phone"" placeholder=""Điện thoại"" name=""dthoai_lxe"">
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
                        <input type=""text"" fn-validate=""validateEmailControl"" class=""form-control email-inputmask"" placeholder=""Email"" autocomplete=""off"" name=""email_lxe");
            WriteLiteral(@""">
                    </div>
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
                        <select class=""form-control"" style=""width:100%"" placeholder=""Hạng GPLX"" autocomplete=""off"" required name=""gplx_hang""></select>
                    </div>
                </div>
                <div class=""col-3"">
                    <div class=""form-group"">
                        <label class=""_required"">Ngày cấp GPLX</label>
                        <div class=""input-group"">
                        ");
            WriteLiteral(@"    <input type=""text"" class=""form-control datepicker"" display-format=""date"" value-format=""number"" required data-drops=""up"" name=""gplx_hieu_luc"" placeholder=""mm/dd/yyyy"">
                            <div class=""input-group-append"">
                                <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""col-3"">
                    <div class=""form-group"">
                        <label class=""_required"">Ngày hết hạn</label>
                        <div class=""input-group"">
                            <input type=""text"" class=""form-control datepicker"" display-format=""date"" value-format=""number"" required data-drops=""up"" name=""gplx_het_han"" placeholder=""mm/dd/yyyy"">
                            <div class=""input-group-append"">
                                <span class=""input-group-text""><span class=""ti-calendar""></span></span>");
            WriteLiteral(@"
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class=""popover-footer"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-90 mg-t-22"" id=""btnLuuAddLicenseInfo"">
            <i class=""fa fa-save""></i>&nbsp;&nbsp;Lưu
        </button>
        <button type=""button"" class=""btn btn-primary btn-sm wd-90 mg-t-22"" data-dismiss=""popover-x"" id=""btnCloseAddLicenseInfo"">
            <i class=""fa fa-save""></i>&nbsp;&nbsp;Đóng
        </button>
    </div>
</div>

<div id=""popoverAddRegistryInfo"" class=""popover popover-x popover-default"" style=""display:none; max-width:600px"">
");
            WriteLiteral(@"    <h3 class=""popover-header popover-title"">
        <span class=""close pull-right"" data-dismiss=""popover-x"">&times;</span>Bổ sung thông tin đăng kiểm
    </h3>
    <div class=""popover-body popover-content"">
        <form id=""frmAddRegistryInfo"" name=""frmAddRegistryInfo"" method=""post"">
            <input type=""hidden"" name=""so_id""");
            BeginWriteAttribute("value", " value=\"", 8933, "\"", 8941, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
            <div class=""row"">
                <div class=""col-12"">
                    <div class=""form-group"">
                        <label class=""_required"">Chọn vụ tổn thất</label>
                        <div class=""input-group"">
                            <select class=""select2 form-control custom-select"" required name=""vu_tt"" style=""width:100%"">
                            </select>
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
                   ");
            WriteLiteral(@"     <label class=""_required"">Ngày cấp</label>
                        <div class=""input-group"">
                            <input type=""text"" class=""form-control datepicker"" display-format=""date"" value-format=""number"" required data-drops=""up"" name=""dangkiem_hieu_luc"" placeholder=""mm/dd/yyyy"">
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
                            <div c");
            WriteLiteral(@"lass=""input-group-append"">
                                <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
    <div class=""popover-footer"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-90 mg-t-22"" id=""btnLuuAddRegistryInfo"">
            <i class=""fa fa-save""></i>&nbsp;&nbsp;Lưu
        </button>
        <button type=""button"" class=""btn btn-primary btn-sm wd-90 mg-t-22"" data-dismiss=""popover-x"" id=""btnCloseAddRegistryInfo"">
            <i class=""fa fa-save""></i>&nbsp;&nbsp;Đóng
        </button>
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
