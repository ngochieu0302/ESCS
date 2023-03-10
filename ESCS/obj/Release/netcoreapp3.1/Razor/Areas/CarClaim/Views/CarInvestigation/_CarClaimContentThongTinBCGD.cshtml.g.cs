#pragma checksum "D:\ESCS\ESCS\Areas\CarClaim\Views\CarInvestigation\_CarClaimContentThongTinBCGD.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7845e627a2162d2add58520865c54a3410c9057a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_CarClaim_Views_CarInvestigation__CarClaimContentThongTinBCGD), @"mvc.1.0.view", @"/Areas/CarClaim/Views/CarInvestigation/_CarClaimContentThongTinBCGD.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7845e627a2162d2add58520865c54a3410c9057a", @"/Areas/CarClaim/Views/CarInvestigation/_CarClaimContentThongTinBCGD.cshtml")]
    public class Areas_CarClaim_Views_CarInvestigation__CarClaimContentThongTinBCGD : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""row mg-t-10"">
    <div class=""col-12"" id=""navBaoCaoGD"">
        <div class=""d-flex justify-content-between"">
            <ul class=""nav nav-pills font-weight-bold"" role=""tablist"">
                <li class=""nav-item mr-2"" style=""font-weight: bold; background-color: #f8f9fa; border-radius: 5px;"">
                    <a class=""nav-link"" onclick=""xemDanhGiaBaoCao('BCGD')"" data-toggle=""tab"" href=""#navBaoCaoGD_BCGD"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                        <i class=""fas fa-info-circle mr-2""></i>Báo cáo giám định
                    </a>
                </li>
                <li class=""nav-item mr-2"" style=""font-weight: bold; background-color: #f8f9fa; border-radius: 5px;"">
                    <a class=""nav-link active"" onclick=""xemDanhGiaBaoCao('DGHT')"" data-toggle=""tab"" href=""#navBaoCaoGD_DGHT"" role=""tab"" aria-controls=""home"" aria-selected=""true"">
                        <i class=""fas fa-align-justify mr-2""></i>Đánh giá hiện trường
                 ");
            WriteLiteral(@"   </a>
                </li>
            </ul>
        </div>
        <div class=""tab-content"">
            <!-- Đánh giá hiện trường -->
            <div class=""tab-pane px-0"" id=""navBaoCaoGD_DGHT"" role=""tabpanel"" aria-labelledby=""home-tab"">
                <div class=""row scrollable"" style=""max-height: 62vh"">
                    <div class=""col-12"">
                        <h4>Thông tin xác nhận khách hàng</h4>
                    </div>
                    <div class=""col-3"">
                        <span class=""font-weight-bold"">Trạng thái xác nhận: </span><span class=""font-weight-bold"" id=""dght_trang_thai"">Chưa gửi xác nhận</span>
                    </div>
                    <div class=""col-3"">
                        <span class=""font-weight-bold"">Hình thức xác nhận: </span><span class=""font-weight-bold"" id=""dght_hinh_thuc"">Chưa xác định</span>
                    </div>
                    <div class=""col-3"">
                        <span class=""font-weight-bold"">Ngày xác nhận: </s");
            WriteLiteral(@"pan><span class=""font-weight-bold"" id=""dght_ngay_xac_nhan"">Chưa xác định</span>
                    </div>
                    <div class=""col-12 mt-2"">
                        <h4>Thông tin đánh giá hiện trường</h4>
                    </div>
                    <div class=""col-12"">
                        <form id=""frmDanhGiaHienTruong"" name=""frmDanhGiaHienTruong"" method=""post"">
                            <div class=""row"" id=""danh_gia_hien_truong"">

                            </div>
                        </form>
                    </div>
                </div>
");
            WriteLiteral(@"            </div>
            <!-- Báo cáo giám định -->
            <div class=""tab-pane px-0"" id=""navBaoCaoGD_BCGD"" role=""tabpanel"" aria-labelledby=""profile-tab"">
                <div class=""card mb-0 modal-main-content"">
                    <div class=""row scrollable"" style=""max-height: 62vh"">
                        <div class=""col-12"">
                            <form name=""frmBaoCaoGD"" id=""frmBaoCaoGD"" method=""post"">
                                <input type=""hidden"" name=""pt_gt_tham_gia_bh""");
            BeginWriteAttribute("value", " value=\"", 3537, "\"", 3545, 0);
            EndWriteAttribute();
            WriteLiteral(" />\r\n                                <input type=\"hidden\" name=\"pt_che_tai\"");
            BeginWriteAttribute("value", " value=\"", 3621, "\"", 3629, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                                <div class=""row"">
                                    <div class=""col-12"">
                                        <h6 class=""font-weight-bold"">Đánh giá, nhận xét cán bộ GĐBT  - <span class=""text-danger"" id=""modalBaoCaoGDTrangThai"">Chưa thực hiện</span></h6>
                                    </div>
                                    <div class=""col-6"">
                                        <a href=""#"">Hồ sơ (GPLX, GCNBH, ĐK…)</a>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" name=""ho_so_day_du"" id=""ho_so_day_du_d"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""ho_so_day_du_d"" style=""cursor:pointer; padding-top:2px"">Đầy đủ, hợp lệ</label>
                                        </div>
    ");
            WriteLiteral(@"                                </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" name=""ho_so_day_du"" id=""ho_so_day_du_k"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""ho_so_day_du_k"" style=""cursor:pointer; padding-top:2px"">Không đủ</label>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <a href=""#"">Nguyên nhân tai nạn</a>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                        ");
            WriteLiteral(@"    <input type=""checkbox"" name=""nguyen_nhan"" id=""nguyen_nhan_d"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""nguyen_nhan_d"" style=""cursor:pointer; padding-top:2px"">Đúng, rõ ràng</label>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" name=""nguyen_nhan"" id=""nguyen_nhan_k"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""nguyen_nhan_k"" style=""cursor:pointer; padding-top:2px"">Không đúng</label>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col");
            WriteLiteral(@"-6"">
                                        <a href=""#"">Tổn thất thuộc phạm vi bảo hiểm</a>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" name=""pham_vi_tt"" id=""pham_vi_tt_c"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""pham_vi_tt_c"" style=""cursor:pointer; padding-top:2px"">Có</label>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" name=""pham_vi_tt"" id=""pham_vi_tt_k"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""pha");
            WriteLiteral(@"m_vi_tt_k"" style=""cursor:pointer; padding-top:2px"">Không</label>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <a href=""#"">Giá trị xe tham gia bảo hiểm</a>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" name=""gt_tham_gia_bh"" id=""gt_tham_gia_bh_d"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""gt_tham_gia_bh_d"" style=""cursor:pointer; padding-top:2px"">Đúng giá trị</label>
                                        </div>
                                    </div>
                                    <div class");
            WriteLiteral(@"=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" name=""gt_tham_gia_bh"" id=""gt_tham_gia_bh_k"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""gt_tham_gia_bh_k"" style=""cursor:pointer; padding-top:2px"">Dưới giá trị (<span id=""pt_gt_tham_gia_bh""></span>%)</label>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <a href=""#"">Tuân thủ của đơn vị cấp BH</a>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" na");
            WriteLiteral(@"me=""tuan_thu"" id=""tuan_thu_c"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""tuan_thu_c"" style=""cursor:pointer; padding-top:2px"">Có</label>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" name=""tuan_thu"" id=""tuan_thu_k"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""tuan_thu_k"" style=""cursor:pointer; padding-top:2px"">Không (Ghi rõ)</label>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-6"">
                                        <a href=");
            WriteLiteral(@"""#"">Thời hạn khai báo của khách hàng</a>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" name=""thoi_han_khai_bao"" id=""thoi_han_khai_bao_d"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""thoi_han_khai_bao_d"" style=""cursor:pointer; padding-top:2px"">Đúng</label>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""custom-control custom-checkbox"">
                                            <input type=""checkbox"" name=""thoi_han_khai_bao"" id=""thoi_han_khai_bao_k"" class=""custom-control-input"">
                                            <label class=""custom-control-label"" for=""thoi_han_khai_bao_k");
            WriteLiteral(@""" style=""cursor:pointer; padding-top:2px"">Không đúng (Chế tài <span id=""pt_che_tai""></span>%)</label>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-12"">
                                        <div class=""form-group"">
                                            <label for=""y_kien"">Nội dung khác</label>
                                            <textarea class=""form-control"" name=""noi_dung_danh_gia"" maxlength=""1000"" autocomplete=""off"" placeholder=""Nội dung khác"" rows=""3""></textarea>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-12 mt-1"">
                                        <h6 class=""font-weight-bold"">Nội dung đề xuất</h6>
   ");
            WriteLiteral("                                 </div>\r\n");
            WriteLiteral("                                    <div class=\"col-6\">\r\n                                        <div class=\"form-group\">\r\n                                            <label");
            BeginWriteAttribute("for", " for=\"", 13362, "\"", 13368, 0);
            EndWriteAttribute();
            WriteLiteral(@">Gara sửa chữa</label>
                                            <div class=""input-group"">
                                                <input type=""text"" class=""form-control cursor-pointer"" name=""gara_de_xuat"" data-ma="""" autocomplete=""off"" placeholder=""Click chọn gara sửa chữa"" onclick=""chonGaraSuaChua(this)"" style=""background-color: #e9ecef;"">
                                                <div class=""input-group-append"">
                                                    <label class=""input-group-text"">
                                                        <a href=""#"" onclick=""xoaChonGara(this)"">
                                                            <i class=""fas fa-times"" aria-hidden=""true"" title=""Xóa chọn gara sửa chữa""></i>
                                                        </a>
                                                    </label>
                                                </div>
                                            </div>
                              ");
            WriteLiteral("          </div>\r\n                                    </div>\r\n                                    <div class=\"col-3\">\r\n                                        <div class=\"form-group\">\r\n                                            <label");
            BeginWriteAttribute("class", " class=\"", 14628, "\"", 14636, 0);
            EndWriteAttribute();
            WriteLiteral(">Gara chính hãng</label>\r\n                                            <select class=\"form-control select2\" name=\"gara_chinh_hang\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 14843, "\"", 14851, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn loại gara</option>
                                                <option value=""C"">Chính hãng</option>
                                                <option value=""K"">Không chính hãng</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label");
            BeginWriteAttribute("class", " class=\"", 15378, "\"", 15386, 0);
            EndWriteAttribute();
            WriteLiteral(">Gara hợp tác</label>\r\n                                            <select class=\"form-control select2\" name=\"gara_hop_tac\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 15587, "\"", 15595, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn nhóm gara</option>
                                                <option value=""C"">Hợp tác</option>
                                                <option value=""K"">Không hợp tác</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label>Lý do</label>
                                            <div class=""input-group"">
                                                <input type=""text"" maxlength=""1000"" name=""ly_do"" autocomplete=""off"" class=""form-control"" placeholder=""Lý do"">
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-");
            WriteLiteral(@"group"">
                                            <label class=""_required"">Ước tổn thất</label>
                                            <div class=""input-group"">
                                                <input type=""text"" maxlength=""15"" readonly required autocomplete=""off"" class=""form-control number placeholder-left"" name=""uoc_ton_that"" placeholder=""Ước tổn thất"">
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label for=""y_kien"" class=""_required"">Giám định viên hiện trường đề xuất</label>
                                            <textarea class=""form-control"" required maxlength=""1000"" name=""gdvht_de_xuat"" autocomplete=""off"" placeholder=""Nội dung khác"" rows=""3""></textarea>
                                        </div>
        ");
            WriteLiteral(@"                            </div>
                                    <div class=""col-6"">
                                        <div class=""form-group"">
                                            <label for=""y_kien"">Ý kiến bồi thường viên</label>
                                            <textarea class=""form-control"" maxlength=""1000"" name=""noi_dung_de_xuat"" autocomplete=""off"" placeholder=""Nội dung khác"" rows=""3""></textarea>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
");
            WriteLiteral("                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n<div class=\"row\" style=\"z-index: 99999; position: fixed; bottom: 2vh; width: 68vw;\">\r\n    <div class=\"col-12 mg-t-5\">\r\n");
            WriteLiteral(@"        <a href=""#"" id=""btnModalTrinhphancapBCGD"" class=""btn btn-primary btn-sm mt-1 mr-1"">
            <i class=""fas fa-share-square mr-1""></i>Trình báo cáo GĐ
        </a>
        <a href=""#"" id=""btnGuiXacNhanDGHT"" class=""btn btn-primary btn-sm mt-1 mr-1 wd-140"">
            <i class=""fas fa-envelope mr-1""></i>Gửi xác nhận ĐGHT
        </a>
        <a href=""#"" id=""btnXacNhanKyTay"" class=""btn btn-primary btn-sm mt-1 mr-1 wd-140"">
            <i class=""fas fa-check mr-1""></i>Xác nhận KH ký tay ĐGHT
        </a>
        <a href=""#"" id=""btnInBCGD"" class=""btn btn-primary btn-sm mt-1 mr-1 wd-90"">
            <i class=""fas fa-print mr-1""></i>In ấn
        </a>
        <a href=""#"" id=""btnInDGHT"" class=""btn btn-primary btn-sm mt-1 mr-1 wd-90"">
            <i class=""fas fa-print mr-1""></i>In ấn
        </a>
        <a href=""#"" onclick=""TransCompensationDisplay()"" class=""btn btn-primary btn-sm mt-1 mr-1"">
            <i class=""fas fa-angle-double-right mr-1""></i> Hồ sơ bồi thường
        </a>
       ");
            WriteLiteral(@" <a href=""#"" class=""btn btn-primary btn-sm mt-1 mr-1 wd-90 float-right"" id=""btnLuuBaoCaoGD"">
            <i class=""fas fa-save mr-1""></i> Lưu
        </a>
        <a href=""#"" class=""btn btn-primary btn-sm mt-1 mr-2 wd-120 float-right"" id=""btnLuuTrinhBaoCaoGD"">
            <i class=""fas fa-share-square mr-1""></i> Lưu và trình
        </a>
        <a href=""#"" class=""btn btn-primary btn-sm mt-1 mr-1 wd-90 float-right"" id=""btnLuuDanhGiaHienTruong"">
            <i class=""fas fa-save mr-1""></i> Lưu
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
