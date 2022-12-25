#pragma checksum "D:\ESCS\ESCS\Areas\MotorcycleClaim\Views\MotorcycleCompensation\_MotorcycleCompensationContentStep3.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "905a25596ef59f9286d87fd8eeccce6f2677015f"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotorcycleClaim_Views_MotorcycleCompensation__MotorcycleCompensationContentStep3), @"mvc.1.0.view", @"/Areas/MotorcycleClaim/Views/MotorcycleCompensation/_MotorcycleCompensationContentStep3.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"905a25596ef59f9286d87fd8eeccce6f2677015f", @"/Areas/MotorcycleClaim/Views/MotorcycleCompensation/_MotorcycleCompensationContentStep3.cshtml")]
    public class Areas_MotorcycleClaim_Views_MotorcycleCompensation__MotorcycleCompensationContentStep3 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""row"">
    <div class=""col-12"">
        <div class=""card mb-0 modal-main-content"">
            <div class=""row"">
                <div class=""col-3"">
                    <span>Tổng hợp tiền phương án khắc phục</span>
                </div>
                <div class=""col-9 text-right"">
                    <span class=""mr-3"" style=""font-size:.8rem"">Tổng tiền giám định: <span class=""spanPATongTienTTGD"" style=""color:red; font-weight:bold;"">0</span></span>
                    <span class=""mr-3"" style=""font-size:.8rem"">Tổng tiền đề xuất: <span class=""spanPATongTienDX"" style=""color:red; font-weight:bold;"">0</span></span>
                    <span style=""font-size:.8rem"">Tổng tiền duyệt: <span class=""spanPATongTienDuyet"" style=""color:red; font-weight:bold;"">0</span></span>
                </div>
            </div>
            <div class=""row mt-1"">
                <div class=""col-12"">
                    <nav aria-label=""breadcrumb"">
                        <ol class=""breadcrumb"" id=""navDan");
            WriteLiteral("hGiaNghiepVu\" style=\"margin:unset;margin-bottom:5px; padding-top:3px; padding-bottom:3px;\">\r\n                        </ol>\r\n                    </nav>\r\n                </div>\r\n");
            WriteLiteral(@"                <div class=""col-12 divDanhGiaItem"" id=""divDanhGiaVCX"">
                    <div class=""table-responsive"" style=""max-height:450px;"">
                        <table class=""table table-bordered fixed-header"">
                            <thead class=""font-weight-bold card-title-bg-primary"">
                                <tr class=""text-center uppercase"">
                                    <th style=""width:55px"">Vụ TT</th>
                                    <th style=""width:190px"">Hạng mục bồi thường</th>
                                    <th>Mức độ</th>
                                    <th style=""width:70px"">Thay thế</th>
                                    <th style=""width:85px"">Chính hãng</th>
                                    <th style=""width:70px"">Thu hồi</th>
                                    <th style=""width:100px"">Giá TTGĐ</th>
                                    <th style=""width:100px"">Giá ĐX</th>
                                    <th style=""width:100px"">Giá Du");
            WriteLiteral(@"yệt</th>
                                    <th style=""width:65px"">Ghi chú</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody id=""tblPhuongAnVCX"">
                            </tbody>
                            <tfoot>
                                <tr class=""text-left card-title-bg"">
                                    <td colspan=""2"">
                                        <a href=""#"" id=""btnThemHMTTPHU"" class=""escs_pquyen"" title=""Thêm hạng mục phụ"">
                                            <i class=""fas fa-plus-square""></i>&nbsp;&nbsp;Thêm hạng mục phụ/ phụ tùng
                                        </a>
                                    </td>
                                    <td class=""text-center font-weight-bold"" colspan=""4"">
                                        Tổng cộng
                                    </td>
                                    <td class=""t");
            WriteLiteral(@"ext-right font-weight-bold"" id=""tblPhuongAnVCXTienGiamDinh""></td>
                                    <td class=""text-right font-weight-bold"" id=""tblPhuongAnVCXTienDeXuat""></td>
                                    <td class=""text-right font-weight-bold"" id=""tblPhuongAnVCXTienDuyet""></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
");
            WriteLiteral(@"                <div class=""col-12 divDanhGiaItem"" id=""divDanhGiaNNTX"">
                    <div class=""table-responsive"" style=""max-height:450px;"">
                        <table id=""tableChiTietTonThatNGUOI"" data-nhom=""NGUOI"" class=""table table-bordered fixed-header tableChiTietTonThat"">
                            <thead class=""font-weight-bold"">
                                <tr class=""text-center uppercase"">
                                    <th>Tên</th>
                                    <th style=""width:60px"">Địa chỉ</th>
                                    <th style=""width:90px"">Mức độ TT</th>
                                    <th style=""width:190px"">TL thương tật</th>
                                    <th style=""width:95px"">% thương tật</th>
                                    <th style=""width:100px"">Tiền tổn thất</th>
                                    <th style=""width:100px"">Tiền đề xuất</th>
                                    <th style=""width:100px"">Tiền duyệt</th>
        ");
            WriteLiteral(@"                            <th style=""width:50px"">Mô tả</th>
                                    <th style=""width:63px"">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody id=""modalChiTietTonThatNGUOI"">
                            </tbody>
                            <tfoot>
                                <tr class=""text-left card-title-bg"">
                                    <td class=""font-weight-bold"" colspan=""3"">
                                        Tổng cộng:
                                    </td>
                                    <td id=""tableChiTietTonThatNGUOITienTT"" class=""text-right font-weight-bold""></td>
                                    <td id=""tableChiTietTonThatNGUOITienGiam"" class=""text-right font-weight-bold""></td>
                                    <td></td>
                                    <td id=""tableChiTietTonThatNGUOITienDx"" class=""text-right font-weight-bold""></td>
                   ");
            WriteLiteral(@"                 <td id=""tableChiTietTonThatNGUOITienDuyet"" class=""text-right font-weight-bold""></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
");
            WriteLiteral(@"                <div class=""col-12 divDanhGiaItem"" id=""divDanhGiaHANGHOA"">
                    <div class=""table-responsive"" style=""max-height:430px;"">
                        <table style=""width:110%"" id=""tableChiTietTonThatHANGHOA"" class=""table table-bordered fixed-header tableChiTietTonThat"">
                            <thead class=""font-weight-bold"">
                                <tr class=""text-center uppercase"">
                                    <th>Tên</th>
                                    <th style=""width:170px"">Mức độ TT</th>
                                    <th style=""width:75px"">Số lượng</th>
                                    <th style=""width:90px"">Đơn vị tính</th>
                                    <th style=""width:100px"">Giá</th>
                                    <th style=""width:90px"">Số lượng TT</th>
                                    <th style=""width:100px"">Tiền tổn thất</th>
                                    <th style=""width:100px"">Tiền đề xuất</th>
           ");
            WriteLiteral(@"                         <th style=""width:100px"">Tiền duyệt</th>
                                    <th style=""width:50px"">Mô tả</th>
                                    <th style=""width:63px"">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody id=""modalChiTietTonThatHANGHOA"">
                            </tbody>
                            <tfoot>
                                <tr class=""text-left card-title-bg"">
                                    <td class=""font-weight-bold"" colspan=""4"">
                                        Tổng cộng:
                                    </td>
                                    <td id=""tableChiTietTonThatHANGHOATienTT"" class=""text-right font-weight-bold""></td>
                                    <td id=""tableChiTietTonThatHANGHOATienGiam"" class=""text-right font-weight-bold""></td>
                                    <td></td>
                                    <td id=""tableChiTietTo");
            WriteLiteral(@"nThatHANGHOATienDx"" class=""text-right font-weight-bold""></td>
                                    <td id=""tableChiTietTonThatHANGHOATienDuyet"" class=""text-right font-weight-bold""></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
");
            WriteLiteral(@"                <div class=""col-12 divDanhGiaItem"" id=""divDanhGiaTNDSNguoi"">
                    <div class=""table-responsive"" style=""max-height:450px;"">
                        <table id=""tableChiTietTonThatTNDS_NGUOI"" data-nhom=""NGUOI"" class=""table table-bordered fixed-header tableChiTietTonThat"">
                            <thead class=""font-weight-bold"">
                                <tr class=""text-center uppercase"">
                                    <th>Tên</th>
                                    <th style=""width:60px"">Địa chỉ</th>
                                    <th style=""width:90px"">Mức độ TT</th>
                                    <th style=""width:190px"">TL thương tật</th>
                                    <th style=""width:95px"">% thương tật</th>
                                    <th style=""width:100px"">Tiền tổn thất</th>
                                    <th style=""width:100px"">Tiền đề xuất</th>
                                    <th style=""width:100px"">Tiền duyệt</th>");
            WriteLiteral(@"
                                    <th style=""width:50px"">Mô tả</th>
                                    <th style=""width:63px"">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody id=""modalChiTietTonThatTNDS_NGUOI"">
                            </tbody>
                            <tfoot>
                                <tr class=""text-left card-title-bg"">
                                    <td class=""font-weight-bold"" colspan=""3"">
                                        Tổng cộng:
                                    </td>
                                    <td id=""tableChiTietTonThatTNDS_NGUOITienTT"" class=""text-right font-weight-bold""></td>
                                    <td id=""tableChiTietTonThatTNDS_NGUOITienGiam"" class=""text-right font-weight-bold""></td>
                                    <td></td>
                                    <td id=""tableChiTietTonThatTNDS_NGUOITienDx"" class=""text-right font-weight-bo");
            WriteLiteral(@"ld""></td>
                                    <td id=""tableChiTietTonThatTNDS_NGUOITienDuyet"" class=""text-right font-weight-bold""></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
");
            WriteLiteral(@"                <div class=""col-12 divDanhGiaItem"" id=""divDanhGiaTNDSTaiSan"">
                    <div class=""table-responsive"" style=""max-height:450px;"">
                        <table style=""width:115%"" id=""tableChiTietTonThatTNDS_TAI_SAN"" data-nhom=""TNDS_TAI_SAN"" class=""table table-bordered fixed-header tableChiTietTonThat"">
                            <thead class=""font-weight-bold"">
                                <tr class=""text-center uppercase"">
                                    <th>Tên</th>
                                    <th style=""width:60px"">Địa chỉ</th>
                                    <th style=""width:170px"">Mức độ TT</th>
                                    <th style=""width:75px"">Số lượng</th>
                                    <th style=""width:90px"">Đơn vị tính</th>
                                    <th style=""width:100px"">Giá</th>
                                    <th style=""width:90px"">Số lượng TT</th>
                                    <th style=""width:100px"">Tiền");
            WriteLiteral(@" tổn thất</th>
                                    <th style=""width:100px"">Tiền đề xuất</th>
                                    <th style=""width:100px"">Tiền duyệt</th>
                                    <th style=""width:50px"">Mô tả</th>
                                    <th style=""width:63px"">Ghi chú</th>
                                </tr>
                            </thead>
                            <tbody id=""modalChiTietTonThatTNDS_TAI_SAN"">
                            </tbody>
                            <tfoot>
                                <tr class=""text-left card-title-bg"">
                                    <td class=""font-weight-bold"" colspan=""5"">
                                        Tổng cộng:
                                    </td>
                                    <td id=""tableChiTietTonThatTNDS_TAI_SANTienTT"" class=""text-right font-weight-bold""></td>
                                    <td id=""tableChiTietTonThatTNDS_TAI_SANTienGiam"" class=""text-right font-weig");
            WriteLiteral(@"ht-bold""></td>
                                    <td></td>
                                    <td id=""tableChiTietTonThatTNDS_TAI_SANTienDx"" class=""text-right font-weight-bold""></td>
                                    <td id=""tableChiTietTonThatTNDS_TAI_SANTienDuyet"" class=""text-right font-weight-bold""></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
                <div class=""col-12 mt-2"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 d-none"" id=""btnLuuHangMucCtiet"">
                        <i class=""fas fa-plus-square""></i>&nbsp;Lưu
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
<div class=""row tab-navigator"">
    <div class=""col-12 mg-t-10"">
        <a href=""#"" data-toggle=""modal"" id=""btn");
            WriteLiteral(@"CarCompensationQuotation"" class=""mr-2"">
            <i class=""fas fa-files-medical mr-2""></i>Đề xuất phương án khắc phục
        </a>

        <a href=""#"" class=""step4btn  mr-2"" id=""btnDuyetBaoGiaGara"">
            <i class=""fas fa-check mr-2""></i>Duyệt phương án
        </a>
        <a href=""#"" class=""step4btn  mr-2"" id=""btnHuyDuyetBaoGiaGara"">
            <i class=""fas fa-stop-circle mr-2""></i>Hủy Duyệt phương án
        </a>
        <a href=""#"" class=""step4btn  mr-2"" id=""btnTuChoiBT"">
            <i class=""fas fa-times mr-2""></i>Từ chối bồi thường
        </a>

        <a href=""#"" class=""step4btn  mr-2"" id=""btnCarCompensationContentStep3_FwdApproval_1"">
            <i class=""fas fa-share-square mr-2""></i>Trình phương án
        </a>

        <a href=""#"" class=""step4btn  mr-2"" id=""btnTrinhTuChoiBT"">
            <i class=""fas fa-share-square mr-2""></i>Trình từ chối bồi thường
        </a>
        <a href=""#"" id=""btnLapPASC"" class=""mr-2"">
            <i class=""fas fa-paste mr-2""></i> Lập");
            WriteLiteral(@" phương án sửa chữa
        </a>
        <a href=""#"" id=""btnGuiMailBBGD"" class=""mr-2"">
            <i class=""fas fa-envelope mr-2""></i>Gửi email
        </a>
        <a href=""#"" id=""btnCarCompensationContentStep3_print"" class=""escs_pquyen"" data-toggle=""modal"" data-target=""#print-modal"">
            <i class=""fas fa-print mr-2""></i>In ấn
        </a>
    </div>
</div>
");
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
