#pragma checksum "D:\ESCS\ESCS\Areas\MotorcycleClaim\Views\_MotorcycleCommonInfo.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "818ada0c062bcd3fbba3028d59b6adc574ed8a1b"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotorcycleClaim_Views__MotorcycleCommonInfo), @"mvc.1.0.view", @"/Areas/MotorcycleClaim/Views/_MotorcycleCommonInfo.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"818ada0c062bcd3fbba3028d59b6adc574ed8a1b", @"/Areas/MotorcycleClaim/Views/_MotorcycleCommonInfo.cshtml")]
    public class Areas_MotorcycleClaim_Views__MotorcycleCommonInfo : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""card mb-0 h-100"" id=""navThongTinHoSo"">
    <ul class=""nav nav-tabs profile-tab"" role=""tablist"">
        <li class=""nav-item shown"">
            <a class=""nav-link active"" data-toggle=""tab"" href=""#navThongTinChung"" role=""tab"" aria-selected=""true"">
                <span class=""d-none d-md-block"">
                    <i class=""fas fa-info-circle""></i> Thông tin chung
                </span>
                <span class=""d-block d-md-none"">
                    <i class=""fas fa-info-circle""></i>
                </span>
            </a>
        </li>
        <li class=""nav-item shown"">
            <a class=""nav-link"" data-toggle=""tab"" href=""#navThongTinLienHe"" role=""tab"" aria-selected=""false"">
                <span class=""d-none d-md-block"">
                    <i class=""fas fa-user""></i> Thông tin liên hệ
                </span>
                <span class=""d-block d-md-none"">
                    <i class=""fas fa-history""></i>
                </span>
            </a>
        </li>
");
            WriteLiteral(@"        <li class=""nav-item"" onclick=""showTabThongTinChung('navQuaTrinhGiaiQuyet')"">
            <a class=""nav-link"" data-toggle=""tab"" href=""#navQuaTrinhGiaiQuyet"" role=""tab"" aria-selected=""false"">
                <span class=""d-none d-md-block"">
                    <i class=""fas fa-eye""></i> Quá trình giải quyết
                </span>
                
            </a>
        </li>
        <li class=""nav-item"" onclick=""showTabThongTinChung('navLichSuTonThat')"">
            <a class=""nav-link"" data-toggle=""tab"" href=""#navLichSuTonThat"" role=""tab"" aria-selected=""false"">
                <span class=""d-none d-md-block"">
                    <i class=""fas fa-history""></i> Lịch sử tổn thất
                </span>
                <span class=""d-block d-md-none"">
                    <i class=""fas fa-history""></i>
                </span>
            </a>
        </li>
    </ul>
    <!-- Tab panes -->
    <div class=""tab-content border border-top-0 scrollable"">
        <div class=""tab-pane active""");
            WriteLiteral(@" id=""navThongTinChung"" role=""tabpanel"">
            <div class=""card-body px-1"" style=""padding-top:5px;"">
                <div class=""border mb-3 rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Thông tin xe tổn thất</h5>
                        <span><a href=""#"" id=""btnSuaThongTinXeTonThat""><i class=""far fa-edit""></i></a></span>
                    </div>
                    <table class=""table"" id=""CarClaimCustomer1"">
                        <tr>
                            <td style=""width:105px; color:#999999"">Ngày thông báo</td>
                            <td data-model=""ngay_tb"">16/08/2020 03:23</td>
                        </tr>
                        <tr>
                            <td style=""width:105px; color:#999999"">Ngày mở hsbt</td>
                            <td data-model=""ngay_ht"">16/08/2020 03:23</td>
                        </tr>
                        <tr>
           ");
            WriteLiteral(@"                 <td style=""width:105px; color:#999999"">Nguồn TB</td>
                            <td data-model=""nguon_tb_ten"">Trực tiếp</td>
                        </tr>
                        <tr>
                            <td style=""width:105px; color:#999999"">Loại hình BH</td>
                            <td data-model=""nv"">Vật chất xe</td>
                        </tr>
                        <tr>
                            <td style=""width:105px; color:#999999"">Trạng thái xử lý</td>
                            <td data-model=""trang_thai"" style=""color:#009efb"">Đã duyệt bồi thường</td>
                        </tr>
                        <tr>
                            <td style=""width:105px; color:#999999"">Tổng ước GĐ</td>
                            <td data-model=""so_tien"" data-format=""${money} VNĐ"">1.200.000</td>
                        </tr>
                    </table>
                </div>
                <div class=""border rounded"">
                    <div class=""d-flex");
            WriteLiteral(@" justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Đối tượng bảo hiểm</h5>
                    </div>
                    <table class=""table"" id=""CarClaimCustomer2"">
                        <tbody>
                            <tr>
                                <td style=""width:105px; color:#999999"">Biển xe</td>
                                <td data-model=""doi_tuong"">20A-005.24</td>
                            </tr>
                            <tr>
                                <td style=""width:105px; color:#999999"">Số GCN</td>
                                <td>
                                    <span data-model=""gcn"">01023320292</span>
                                    <span class=""float-right"">
                                        <a href=""#"" id=""btnXemThongTinChungNhan""><i class=""fas fa-eye"" title=""Xem chi tiết GCN bảo hiểm""></i></a>
                                    </span>
                                </td>
       ");
            WriteLiteral(@"                     </tr>
                            <tr>
                                <td style=""width:105px; color:#999999"">Số hợp đồng</td>
                                <td data-model=""so_hd"">004.KD03.HD.XE.20.037160</td>
                            </tr>

                            <tr>
                                <td style=""width:105px; color:#999999"">Hiệu lực BH</td>
                                <td data-model=""hieu_luc"">15/07/2020 - 15/07/2021</td>
                            </tr>
                            <tr>
                                <td style=""width:105px; color:#999999"">Chủ xe</td>
                                <td>
                                    <span data-model=""chu_xe"" style=""width:auto"">Công ty TNHH Giải pháp phần mềm bồi thường thông minh</span>
                                    <span class=""float-right"">
                                        <a href=""#"" onclick=""chonKhachHangVip(this)"">                                    
                  ");
            WriteLiteral("                          <i id=\"chonKhachHangVip\" class=\"rating-star fas fa-star defaultColor\"></i>                                        \r\n                                        </a>\r\n                                    </span>\r\n");
            WriteLiteral(@"                                </td>                           
                            </tr>
                            <tr>
                                <td style=""width:105px; color:#999999"">Điện thoại</td>
                                <td>
                                    <span data-model=""dien_thoai"">024.909029202</span>
                                    <span class=""float-right"">
                                        <a href=""#"" id=""ttchung_dien_thoai""><i class=""fal fa-phone-rotary"" title=""Gọi điện thoại""></i></a>
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td style=""width:105px; color:#999999"">Email</td>
                                <td data-model=""email"">escs.vn@gmail.com </td>
                            </tr>
                        </tbody>

                        <tfoot>
                            <tr class=""text-right c");
            WriteLiteral(@"ard-title-bg"">
                                <td colspan=""2"" class=""text-center"">
                                    <a href=""javascript:void(0)"" id=""btnHuyHoSo"" class=""d-none escs_pquyen mr-4"">
                                        <i class=""fas fa-trash-alt mr-2""></i>Hủy hồ sơ
                                    </a>
                                    <a href=""javascript:void(0)"" id=""btnChuyenNguoiXuLy"" class=""d-none escs_pquyen"">
                                        <i class=""far fa-user-friends mr-2""></i>Chuyển người xử lý
                                    </a>
                                </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
        <div class=""tab-pane"" id=""navThongTinLienHe"" role=""tabpanel"">
            <div class=""card-body px-1"" style=""padding-top:5px;"">
                <div class=""border mb-3 rounded"">
                    <div class=""d-flex justify");
            WriteLiteral(@"-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Người thông báo</h5>
                        <span class=""float-right"" id=""CarCommonInfoCustomerInfo"">
                            <a href=""#"" data-toggle=""modal"" id=""btnSuaThongTinNguoiThongBao"" data-target=""#modalCarCustomerInfo"" data-backdrop=""static"" data-keyboard=""false""><i class=""fal fa-edit"" title=""Sửa thông tin""></i></a>
                        </span>
                    </div>
                    <table class=""table"" id=""CarClaimCustomer3"">
                        <tr>
                            <td style=""width:105px; color:#999999"">Người yêu cầu</td>
                            <td data-model=""nguoi_tb"">Nguyễn Trần Vân Anh</td>
                        </tr>
                        <tr>
                            <td style=""width:105px; color:#999999"">Mối quan hệ</td>
                            <td data-model=""moi_qh_tb_ten"">Bản thân</td>
                        </tr>
                  ");
            WriteLiteral(@"      <tr>
                            <td style=""width:105px; color:#999999"">Điện thoại</td>
                            <td> <span data-model=""dthoai_tb"">0912787928</span> <span class=""float-right""><a href=""#"" id=""ttNguoiThongBao_dien_thoai""><i class=""fal fa-phone-rotary"" title=""Gọi điện thoại""></i></a></span></td>
                        </tr>
                        <tr>
                            <td style=""width:105px; color:#999999"">Email</td>
                            <td data-model=""email_tb"">anhntv.hn@gmailcom</td>
                        </tr>
                    </table>
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Người liên hệ</h5>

                    </div>
                    <table class=""table"" id=""CarClaimCustomer4"">
                        <tbody>

                            <tr>
                                <td style=""width:105px; color:#999999"">Họ tên</td>
          ");
            WriteLiteral(@"                      <td data-model=""nguoi_lhe"">Nguyễn Trần Vân Anh</td>
                            </tr>
                            <tr>
                                <td style=""width:105px; color:#999999"">Mối quan hệ</td>
                                <td data-model=""moi_qh_lhe_ten"">Bản thân</td>
                            </tr>
                            <tr>
                                <td style=""width:105px; color:#999999"">Điện thoại</td>
                                <td> <span data-model=""dthoai_lhe"">0912787928</span> <span class=""float-right""><a href=""#"" id=""ttNguoiLienHe_dien_thoai""><i class=""fal fa-phone-rotary"" title=""Gọi điện thoại""></i></a></span></td>
                            </tr>
                            <tr>
                                <td style=""width:105px; color:#999999"">Email</td>
                                <td data-model=""email_lhe"">anhntv.hn@gmailcom</td>
                            </tr>
                        </tbody>

                   ");
            WriteLiteral(@" </table>
                </div>
            </div>
        </div>
        <!--second tab-->
        <div class=""tab-pane"" id=""navQuaTrinhGiaiQuyet"" role=""tabpanel"">
            <div class=""card-body px-1"" style=""padding-top:5px;"">
                <div class=""border mb-3 rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Quá trình giải quyết</h5>
                        <span><a href=""#"" id=""btnXemTienTrinhGiaiQuyet"" data-toggle=""modal"" ");
            WriteLiteral(@"><i class=""far fa-stream""></i></a></span>
                    </div>
                    <div class=""timeline mt-3"" id=""navQuaTrinhGiaiQuyetTimeLine"">
                      
                    </div>
                </div>

            </div>
        </div>
        <div class=""tab-pane"" id=""navLichSuTonThat"" role=""tabpanel"">
            <div class=""card-body px-1"" style=""padding-top:5px;"">
                <div class=""border mb-3 rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Lịch sử tổn thất</h5>
                    </div>
                    <div class=""timeline mt-3"" id=""navLichSuTonThatTimeLine"">

                    </div>
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
