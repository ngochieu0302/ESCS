#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\UserManagement\_DiaBanGiamDinh.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c9f0156ddf2e34be8afe1c28b10dcf085b9162a0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_UserManagement__DiaBanGiamDinh), @"mvc.1.0.view", @"/Areas/Admin/Views/UserManagement/_DiaBanGiamDinh.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c9f0156ddf2e34be8afe1c28b10dcf085b9162a0", @"/Areas/Admin/Views/UserManagement/_DiaBanGiamDinh.cshtml")]
    public class Areas_Admin_Views_UserManagement__DiaBanGiamDinh : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""modal fade bs-example-modal-lg"" id=""modalDiaBanGiamDinh"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog modal-lg"" role=""document"">
        <div class=""modal-content"">
            <form name=""frmPhanDiaBanGiamDinh"" method=""post"">
                <div class=""modal-header"">
                    <h4 class=""modal-title"">Phân địa bàn giám định</h4>
                    <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"" style=""padding-bottom: 0px;"">
                    <div class=""row"">
                        <div class=""col-sm-6"">
                            <div class=""form-group"">
                                <label>Miền</label>
                                <select class=""select2 form-control custom-select"" name=""mien"" style=""width: 100%; height:36px;""></sele");
            WriteLiteral(@"ct>
                            </div>
                        </div>
                    </div>
                    <div class=""row"">
                        <div class=""col-sm-6"">
                            <div class=""card"" style=""margin-bottom:unset;"">
                                <div class=""card-body px-0"" style=""padding:unset !important;"">
                                    <div class=""border mb-3 rounded"">
                                        <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                                            <h5 class=""m-0"">Tỉnh/thành phố</h5>
                                        </div>
                                        <div class=""pd-10"">
                                            <input type=""text"" autocomplete=""off"" id=""input_tkiem_tinh_thanh"" onkeyup=""onSearchTinhThanh(this)"" placeholder=""Tìm kiếm tỉnh thành"" class=""form-control"">
                                        </div>
                              ");
            WriteLiteral(@"          <div class=""pd-10 scrollable"" id=""ds_tinh_thanh"" style=""height:260px"">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-sm-6"">
                            <div class=""card"" style=""margin-bottom:unset;"">
                                <div class=""card-body px-0"" style=""padding:unset !important;"">
                                    <div class=""border mb-3 rounded"">
                                        <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                                            <h5 class=""m-0"">Quận/huyện/xã phường/thị trấn</h5>
                                        </div>
                                        <div class=""pd-10"">
                                            <input type=""text"" autocomplete=""off"" name=""tim"" id=""input_tkiem_quan_huyen"" o");
            WriteLiteral(@"nkeyup=""onSearchQuanHuyen(this)"" placeholder=""Tìm kiếm quận huyện"" class=""form-control"">
                                        </div>
                                        <div class=""pd-10 scrollable"" id=""ds_quan_huyen"" style=""height:260px"">

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""modal-footer"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-85"" id=""btnLuuPhanDiaBan""><i class=""fa fa-save""></i> Lưu</button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-85"" data-dismiss=""modal""><i class=""fas fa-window-close""></i> Đóng</button>
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
