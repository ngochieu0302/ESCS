#pragma checksum "D:\ESCS\ESCS\Areas\Contract\Views\Share\_ContractAttachFile.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d58902f949bf0e950c73f48b498ec9c7b36babfe"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Contract_Views_Share__ContractAttachFile), @"mvc.1.0.view", @"/Areas/Contract/Views/Share/_ContractAttachFile.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d58902f949bf0e950c73f48b498ec9c7b36babfe", @"/Areas/Contract/Views/Share/_ContractAttachFile.cshtml")]
    public class Areas_Contract_Views_Share__ContractAttachFile : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""row"">
    <div class=""col-9 pr-0"">
        <div class=""card mb-0 modal-main-content"">
            <div class=""card-body px-0"" style=""padding-top:0 !important"">
                <div class=""border rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg border-bottom"">
                        <h5 class=""m-0"">Hình ảnh hồ sơ</h5>
                    </div>
                    <div class=""row"">
                        <div class=""col-12"">
                            <div id=""img-container"" style=""height:63vh""></div>
                        </div>
                    </div>
                </div>
                <div class=""row"" style=""margin-top: -30px; margin-left: 2px; display: block;"">
                    <form class=""form-inline"" name=""frmNgayChup"" method=""post"">
                        <div class=""form-group mb-2"">
                            <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width: 95px; backgrou");
            WriteLiteral(@"nd: #54667a0a; border: none; position: relative;"" name=""ngay"" readonly placeholder=""Ngày chụp"">
                        </div>
                        <span style=""margin-top: -8px; font-weight: bold;"">-</span>
                        <div class=""form-group mb-2"">
                            <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width: 127px; background: #54667a0a; border: none; position: relative;"" name=""nsd"" readonly placeholder=""Người tải ảnh"">
                        </div>
                    </form>
                </div>
                <div class=""row mt-2"">
                    <div class=""col-5"">
                        <form class=""form-inline"" name=""frmToaDoAnh"" method=""post"">
                            <div class=""form-group mb-2"">
                                <label style=""padding-top:4px; padding-right:5px"">X:</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width:80px"" name=""kinh_do"" readonly p");
            WriteLiteral(@"laceholder=""Kinh độ"">
                            </div>
                            <div class=""form-group mx-sm-3 mb-2"">
                                <label style=""padding-top:4px; padding-right:5px"">Y:</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width:80px"" name=""vi_do"" readonly placeholder=""Vĩ độ"">
                            </div>
                            <div class=""form-group mb-2"">
                                <a href=""#"" id=""btnXemViTriChupAnh""><i class=""fas fa-map-marker-alt mr-1"" title=""Xem chi tiết bản đồ""></i> Xem vị trí</a>
                            </div>
                        </form>
                    </div>
                    <div class=""col-7"">
                        <div class=""form-group mb-2"">
                            <a href=""#"" style=""padding-top:5px;"" id=""btnXemVideoDGRRTabHSGT"" class=""float-right""><i class=""fas fa-file-video mr-1""></i>Xem Video</a>
                        </div>
         ");
            WriteLiteral(@"           </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""col-3"">
        <div class=""card m-0"">
            <div class=""card-body p-0"">
                <div class=""border rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg border-bottom"">
                        <div class=""btn-group float-right"" style=""color:#009efb"">
                            <a class=""btn btn-light rounded py-0"" id=""btnAnhHopDong"">
                                <i class=""fas fa-file-contract"" title=""Click để xem ảnh hợp đồng""></i>
                            </a>
                            <a class=""btn btn-light rounded py-0"" id=""btnTransImageView"">
                                <i class=""fas fa-th""></i>
                            </a>
                        </div>
                    </div>
                    <div class=""container-fluid scrollable"" id=""lstImage"" style=""height: 430px;"">
                     ");
            WriteLiteral(@"   <div class=""row"">
                            <div class=""col-12 list-pictures"" id=""dsAnhTonThat"">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=""container-fluid"">
            <div class=""row"">
                <div class=""btn-group btn-group-justified"" role=""group"">
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Phân loại danh mục"" id=""btnViewAnhListDGTT"">
                        <i class=""fas fa-atlas""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Tải xuống"" id=""btnDownLoadAnhDGTT"">
                        <i class=""fas fa-download""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Tải lên"" id=""btnUpLoadAnhDGTT"">
                      ");
            WriteLiteral(@"  <i class=""fas fa-upload""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""In"" id=""btnInAnhDGTT"">
                        <i class=""fas fa-print""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Xóa"" id=""btnXoaLoadAnhDGTT"">
                        <i class=""fas fa-trash-alt""></i>
                    </button>
                </div>
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
