#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\_ModalThemHangMucTaiLieu.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c8ef13063a3723ccd38e16f90080e79c49212ef8"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views__ModalThemHangMucTaiLieu), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/_ModalThemHangMucTaiLieu.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c8ef13063a3723ccd38e16f90080e79c49212ef8", @"/Areas/HealthClaim/Views/_ModalThemHangMucTaiLieu.cshtml")]
    public class Areas_HealthClaim_Views__ModalThemHangMucTaiLieu : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""modal fade bs-example-modal-lg"" id=""modalThemHangMucTaiLieu"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog modal-lg"" role=""document"">
        <div class=""modal-content"">
            <form name=""frmThemHangMucTaiLieu"" method=""post"">
                <div class=""modal-header"">
                    <h4 class=""modal-title"">Hạng mục con người</h4>
                    <button type=""button"" class=""close"" id=""nodeDongModalThemHangMucTaiLieu"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <input type=""hidden"" name=""nv""");
            BeginWriteAttribute("value", " value=\"", 732, "\"", 740, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                    <div class=""row"">
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Đối tác</label>
                                <select class=""select2 form-control custom-select select2-hidden-accessible"" required name=""ma_doi_tac"" style=""width: 100%; height:36px;""></select>
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Mã</label>
                                <input type=""text"" maxlength=""20"" placeholder=""Mã"" autocomplete=""off"" name=""ma"" required class=""form-control upper"">
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Loại</l");
            WriteLiteral("abel>\r\n                                <select class=\"select2 form-control custom-select\" name=\"loai\" required style=\"width: 100%; height:36px;\">\r\n                                    <option");
            BeginWriteAttribute("value", " value=\"", 1955, "\"", 1963, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn loại</option>
                                    <option value=""TL"">Tài liệu bồi thường</option>
                                    <option value=""TLHD"">Tài liệu hợp đồng</option>
                                    <option value=""NHOM_GHI_CHU"">Nhóm ghi chú bảo lãnh</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top:5px"">
                        <div class=""col-sm-8"">
                            <div class=""form-group"">
                                <label class=""_required"">Tên</label>
                                <input type=""text"" maxlength=""250"" placeholder=""Tên hạng mục con người"" autocomplete=""off"" name=""ten"" required class=""form-control"">
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                           ");
            WriteLiteral("     <label class=\"_required\">Phát sinh</label>\r\n                                <select class=\"select2 form-control custom-select\" required name=\"ps\" style=\"width: 100%; height:36px;\">\r\n                                    <option");
            BeginWriteAttribute("value", " value=\"", 3218, "\"", 3226, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn phát sinh</option>
                                    <option value=""BT"">Bồi thường</option>
                                    <option value=""CD"">Cấp đơn</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top: 5px"">
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Bắt buộc</label>
                                <select class=""select2 form-control custom-select"" required name=""bb"" style=""width: 100%; height:36px;"">
                                    <option");
            BeginWriteAttribute("value", " value=\"", 3962, "\"", 3970, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn</option>
                                    <option value=""C"">Có</option>
                                    <option value=""K"">Không</option>
                                </select>
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label");
            BeginWriteAttribute("class", " class=\"", 4375, "\"", 4383, 0);
            EndWriteAttribute();
            WriteLiteral(@">Số thứ tự</label>
                                <input type=""text"" min=""0"" maxlength=""5"" required autocomplete=""off"" placeholder=""Thứ tự hiển thị"" name=""stt"" class=""form-control decimal"">
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Hiển thị trên app</label>
                                <select class=""select2 form-control custom-select"" required name=""hien_thi_app"" style=""width: 100%; height:36px;"">
                                    <option");
            BeginWriteAttribute("value", " value=\"", 5022, "\"", 5030, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn hiển thị trên app</option>
                                    <option value=""1"">Hiển thị</option>
                                    <option value=""0"">Không hiển thị</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row"" style=""margin-top: 5px"">
                        <div class=""col-sm-8"">
                            <div class=""form-group green-border-focus"">
                                <label>Ghi chú</label>
                                <input type=""text"" name=""ghi_chu"" maxlength=""250"" autocomplete=""off"" placeholder=""Ghi chú"" class=""form-control"" />
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Trạng thái</label>
                                <select class=""select2 form-cont");
            WriteLiteral("rol custom-select\" required name=\"trang_thai\" style=\"width: 100%; height:36px;\">\r\n                                    <option");
            BeginWriteAttribute("value", " value=\"", 6180, "\"", 6188, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn trạng thái</option>
                                    <option value=""0"">Ngưng sử dụng</option>
                                    <option value=""1"">Đang sử dụng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""modal-footer"" style=""display:block"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" id=""btnDongModalThemHangMucTaiLieu""><i class=""fas fa-window-close""></i> Đóng</button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" id=""btnLuuThemHangMucTaiLieu""><i class=""fa fa-save""></i> Lưu</button>
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
