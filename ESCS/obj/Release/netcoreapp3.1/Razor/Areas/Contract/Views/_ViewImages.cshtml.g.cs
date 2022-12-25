#pragma checksum "D:\ESCS\ESCS\Areas\Contract\Views\_ViewImages.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "2be85b8242eff0cdd3dd6de68173e23347ce4ddc"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Contract_Views__ViewImages), @"mvc.1.0.view", @"/Areas/Contract/Views/_ViewImages.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"2be85b8242eff0cdd3dd6de68173e23347ce4ddc", @"/Areas/Contract/Views/_ViewImages.cshtml")]
    public class Areas_Contract_Views__ViewImages : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalViewImagesDGRR"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-lg"" style=""max-width: unset; width:950px"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thông tin hạng mục</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"" id=""modalViewImagesContent"" style=""height:450px;"">
                <div class=""row"" id=""modalViewImagesThongTinChiTiet"" style=""display:none;""></div>
                <div class=""row"">
                    <div class=""col-8"">
                        <div class=""card"">
                            <div class=""card-body p-0"">
                                <div class=""border mb-3 rounded"">
                                    <div style=""height:410px;"" class=""mx-auto");
            WriteLiteral(@" d-flex align-items-center"" id=""divViewImages"">
                                        <p>Click để xem ảnh</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""col-4"">
                        <div class=""card"">
                            <div class=""card-body p-0"">
                                <div class=""border mb-3 rounded"">
                                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                                        <h5 class=""m-0"">Danh sách ảnh</h5>
                                    </div>
                                    <div style=""height:375px;"" id=""modalViewImagesContentList"" class=""scrollable"">

                                    </div>
                                </div>
                            </div>
                        </div>
            ");
            WriteLiteral(@"        </div>
                </div>
            </div>
            <div class=""modal-footer"">
                <button type=""button"" class=""btn-outline-primary btn-sm wd-90 mg-t-22"" data-dismiss=""modal""><i class=""fas fa-window-close""></i>&nbsp;&nbsp;Đóng</button>
            </div>
        </div>
    </div>
</div>

<div class=""custom-modal"">
    <div id=""modalXemHinhAnhDGRR"" class=""modal fade"" tabindex=""-1"" data-backdrop=""false"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 9999999;width:1250px;top: -2%; left: 10%;"">
        <div class=""modal-dialog modal-lg"" style=""width:100%;max-width:unset"">
            <div class=""modal-content"" style=""border:3px solid #1e88e5;box-shadow: 1px 8px 10px 0px rgb(106 160 201);"">
                <div class=""modal-header py-1"" style=""background-color:#0069d9; cursor:pointer;border:unset;"">
                    <h5 class=""modal-title"" style=""color:#fff"">Hình ảnh chi tiết</h5>
                    <button type=""button"" class=""close"" data-di");
            WriteLiteral(@"smiss=""modal"" aria-hidden=""true"">×</button>
                </div>
                <div class=""modal-body"">
                    <div class=""row"">
                        <div class=""col-9 modal-hien-thi"">
                            <div class=""card mb-0"">
                                <div id=""div_hinh_anh"" class=""card-body p-0"" style=""height:70vh; text-align:center"">
                                    <div id=""img-hang-muc-container"" style=""height:70vh""></div>
                                </div>
                            </div>
                        </div>
                        <div class=""col-3"" id=""accordion"">
                            <div class=""card mb-1"">
                                <div class=""card-header p-2"" style=""border:none"">
                                    <input type=""text"" id=""input_imagesCategory"" placeholder=""Tìm kiếm theo hạng mục"" class=""form-control"">
                                </div>
                                <div");
            BeginWriteAttribute("class", " class=\"", 4071, "\"", 4079, 0);
            EndWriteAttribute();
            WriteLiteral(@">
                                    <div class=""card-body p-1"">
                                        <div style=""width:100%; vertical-align:middle;max-height:64vh"" class=""scrollable"">
                                            <div style=""width:100%"" id=""dsHinhAnhHangMuc"" class=""list-pictures-hang-muc"">

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""row mt-2 px-2"">
                        <form class=""form-inline"" name=""frmNgayChup"" style="" margin-left: 10px;"" method=""post"">
                            <div class=""form-group"">
                                <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width: 150px;"" name=""ngay"" readonly placeholder=""Ngày chụp"">
                            </div>
               ");
            WriteLiteral(@"             <span style=""font-weight: bold; margin: 0 6px;"">-</span>
                            <div class=""form-group"">
                                <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width: 200px; "" name=""nsd"" readonly placeholder=""Người tải ảnh"">
                            </div>
                        </form>
                        <form class=""form-inline"" name=""frmToaDoAnh"" method=""post"">
                            <div class=""form-group"">
                                <label style=""padding-top:4px; margin: 0 7px;"">X:</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width: 125px;"" name=""kinh_do"" readonly placeholder=""Kinh độ"">
                            </div>
                            <div class=""form-group"">
                                <label style=""padding-top: 4px; margin: 0 6px;"">Y:</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" st");
            WriteLiteral(@"yle=""width: 125px; "" name=""vi_do"" readonly placeholder=""Vĩ độ"">
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    a.item-image-view {
        display: block;
        float: left;
        margin: 10px 15px;
    }

    #modalViewImagesContent::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    #modalViewImagesContent::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    /* Handle */
    #modalViewImagesContent::-webkit-scrollbar-thumb {
        background: #888;
    }

        /* Handle on hover */
        #modalViewImagesContent::-webkit-scrollbar-thumb:hover {
            background: #555;
        }
</style>

<script type=""text/html"" id=""dsHinhAnhHangMucDGRRTemplate"">
    <% if(danh_sach.length > 0){ %>
    <% _.forEach(danh_sach, function(item,index) { %>
    <div class=""imagesCategory"" style=""display: table-r");
            WriteLiteral(@"ow"" data-search=""<%- ESUtil.xoaKhoangTrangText(item.nhom)%>"">
        <p style=""margin-bottom:5px;"">
            <a href=""#""><%- item.nhom %></a>
        </p>
        <% _.forEach(item.children, function(image,index_anh) { %>
        <div style=""width:60px; height:60px; margin-right:10px; margin-bottom:5px; cursor:pointer;float:left;"">
            <img style=""width: 100%; height:100%; border-radius:10px"" data-original="""" location-x=""<%- image.x %>"" location-y=""<%- image.y %>"" data-ngay=""<%- image.ngay %>"" data-nsd=""<%- image.nsd%>"" data-id=""<%- image.so_id %>"" data-bt=""<%- image.bt %>"" data-ma-file=""<%- image.ma_file %>"" data-pm=""<%- image.pm %>"" data-cnhanh=""<%- image.ma_chi_nhanh %>"" src=""data:image/png;base64, <%- image.duong_dan %>"" alt=""<%- image.ten_file %>"">
        </div>
        <% }) %>
    </div>
    <% })} %>
</script>");
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
