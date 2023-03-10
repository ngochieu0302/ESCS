#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\SettingApp\_Modal.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "9ffadb749c5ea5e64c66fb4da84b551521b71a98"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_SettingApp__Modal), @"mvc.1.0.view", @"/Areas/Admin/Views/SettingApp/_Modal.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"9ffadb749c5ea5e64c66fb4da84b551521b71a98", @"/Areas/Admin/Views/SettingApp/_Modal.cshtml")]
    public class Areas_Admin_Views_SettingApp__Modal : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""modal fade bs-example-modal-lg"" id=""modalNhapCaiDat"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog modal-lg"" role=""document"">
        <div class=""modal-content"">
            <form name=""frmLuuThongTinCaiDat"" method=""post"">
                <div class=""modal-header"">
                    <h4 class=""modal-title"">Thêm cài đặt ứng dụng</h4>
                    <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""row"">
                        <div class=""col-sm-12"">
                            <input type=""hidden"" name=""url_anh"">
                            <!--left col-->
                            <div class=""text-center"">
                                <label for=""file_anh"" style=""cursor: pointer"">
                              ");
            WriteLiteral("      <img id=\"img_main\"");
            BeginWriteAttribute("src", " src=\"", 1048, "\"", 1054, 0);
            EndWriteAttribute();
            WriteLiteral(@" class=""avatar img-circle img-thumbnail"" alt=""avatar"" style=""width: 80px; height: 80px"">
                                </label>
                                <input type=""file"" style=""display: none"" class=""text-center center-block mt-5"" id=""file_anh"" name=""file_anh"">
                            </div><br>

                        </div>
                    </div>
                    <div class=""row"">
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label");
            BeginWriteAttribute("class", " class=\"", 1611, "\"", 1619, 0);
            EndWriteAttribute();
            WriteLiteral(">Mã đối tác</label>\r\n                                <select class=\"select2 form-control custom-select\"");
            BeginWriteAttribute("required", " required=\"", 1723, "\"", 1734, 0);
            EndWriteAttribute();
            WriteLiteral(@" name=""ma_doi_tac"" style=""width: 100%; height: 36px;""></select>
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Ứng dụng</label>
                                <select class=""select2 form-control custom-select select2-hidden-accessible""");
            BeginWriteAttribute("required", " required=\"", 2153, "\"", 2164, 0);
            EndWriteAttribute();
            WriteLiteral(" name=\"ma_app\" style=\"width: 100%; height: 36px;\">\r\n                                    <option");
            BeginWriteAttribute("value", " value=\"", 2260, "\"", 2268, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn ứng dụng</option>
                                    <option value=""WEB"" selected=""selected"">Ứng dụng Web</option>
                                </select>
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Tên cài đặt</label>
                                <input type=""text"" maxlength=""250"" name=""ten"" autocomplete=""off""");
            BeginWriteAttribute("required", " required=\"", 2780, "\"", 2791, 0);
            EndWriteAttribute();
            WriteLiteral(@" class=""form-control"" placeholder=""Nhập vào tên cấu hình cài đặt"">
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Tên tắt</label>
                                <input type=""text"" maxlength=""250"" name=""ten_tat"" autocomplete=""off"" required class=""form-control"" placeholder=""Nhập vào tên tắt"">
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Loại</label>
                                <select class=""select2 form-control custom-select select2-hidden-accessible"" name=""loai"" style=""width: 100%; height: 36px;""");
            BeginWriteAttribute("required", " required=\"", 3664, "\"", 3675, 0);
            EndWriteAttribute();
            WriteLiteral(">\r\n                                    <option");
            BeginWriteAttribute("value", " value=\"", 3722, "\"", 3730, 0);
            EndWriteAttribute();
            WriteLiteral(@" selected=""selected"">Chọn loại</option>
                                    <option value=""LOGO_WEB_APP"">Logo web app</option>
                                    <option value=""LOGO_MAU_IN"">Logo mẫu in</option>
                                    <option value=""FAVICON"">Favicon</option>
                                    <option value=""LOGO_DANG_NHAP"">Logo màn hình đăng nhập</option>
                                </select>
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Chiều rộng</label>
                                <input type=""text"" maxlength=""250"" name=""chieu_rong"" autocomplete=""off"" required class=""form-control"" placeholder=""Nhập vào chiều rộng ..."">
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group");
            WriteLiteral(@""">
                                <label class=""_required"">Chiều dài</label>
                                <input type=""text"" maxlength=""250"" name=""chieu_dai"" autocomplete=""off"" required class=""form-control"" placeholder=""Nhập vào chiều dài ..."">
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Tọa độ x</label>
                                <input type=""text"" maxlength=""250"" name=""toa_do_x"" autocomplete=""off"" required class=""form-control"" placeholder=""Nhập vào tọa độ x ..."">
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Tọa độ y</label>
                                <input type=""text"" maxlength=""250"" name=""toa_do_y"" autocomplete=""off"" required c");
            WriteLiteral(@"lass=""form-control"" placeholder=""Nhập vào tọa độ y ..."">
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""modal-footer"" style=""display:block"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" data-dismiss=""modal""><i class=""fas fa-window-close""></i> Đóng</button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" id=""btnThemMoiCauHinh""><i class=""fa fa-save""></i> Thêm mới</button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" id=""btnCapNhatCauHinh""><i class=""fa fa-save""></i> Cập nhật</button>
                    <button type=""button"" class=""btn btn-outline-primary btn-sm wd-80"" id=""btnDeleteCauHinh""><i class=""fas fa-trash-alt""></i> Xóa</button>
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
