#pragma checksum "D:\ESCS\ESCS\Areas\Contract\Views\OtherContract\_OtherContractSearch.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "6162bd65d46dc3891fe7faf8c7b939311f75c59a"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Contract_Views_OtherContract__OtherContractSearch), @"mvc.1.0.view", @"/Areas/Contract/Views/OtherContract/_OtherContractSearch.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"6162bd65d46dc3891fe7faf8c7b939311f75c59a", @"/Areas/Contract/Views/OtherContract/_OtherContractSearch.cshtml")]
    public class Areas_Contract_Views_OtherContract__OtherContractSearch : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div id=""modalOtherContractSearch"" class=""modal fade"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"" style=""z-index: 1600;"">
    <div class=""modal-dialog modal-lg"" style=""max-width:unset; width:75%"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"">Thêm hợp đồng</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"" id=""btnCloseHD"">×</button>
            </div>
            <div class=""card border mb-0 p-2"">
                <div class=""card-body p-1"" style=""padding:0px;"" id=""navTabTimKiemKhachHang"">
                    <ul class=""cd-breadcrumb triangle nav nav-tabs"" role=""tablist"">
                        <li role=""presentation"">
                            <a data-toggle=""tab"" href=""#Tab_tabTimKiemKH"" role=""tab"" aria-selected=""false"">
                                <span class=""fa fa-user mr-2""></span>Thông tin khách hàng
                  ");
            WriteLiteral(@"          </a>
                        </li>
                        <li role=""presentation"">
                            <a data-toggle=""tab"" href=""#Tab_tabThongTinHD"" role=""tab"" aria-selected=""false"">
                                <span class=""fa fa-file-contract mr-2""></span>Thông tin hợp đồng
                            </a>
                        </li>
                    </ul>
                    <div class=""tab-content"">
                        <div class=""tab-pane active"" role=""tabpanel"" id=""tabTimKiemKH"">
                            <form name=""frmOtherContractSearch"" id=""frmOtherContractSearch"" method=""post"">
                                <input type=""hidden"" name=""so_id_kh"" />
                                <input type=""hidden"" name=""ma_kh"" />
                                <div class=""row"">
                                    <div class=""col-sm-3"">
                                        <select class=""select2 form-control custom-select"" required name=""ma_doi_tac"" style=""widt");
            WriteLiteral(@"h: 100%""></select>
                                    </div>
                                    <div class=""col-sm-3"">
                                        <select class=""select2 form-control custom-select"" required name=""ma_chi_nhanh"" style=""width: 100%""></select>
                                    </div>
                                    <div class=""col-sm-2"">
                                        <select class=""select2 form-control custom-select"" required name=""loai_kh"" style=""width: 100%"">
                                            <option");
            BeginWriteAttribute("value", " value=\"", 2615, "\"", 2623, 0);
            EndWriteAttribute();
            WriteLiteral(@" selected>Chọn loại khách hàng</option>
                                            <option value=""C"">Cá nhân</option>
                                            <option value=""T"">Tổ chức</option>
                                        </select>
                                    </div>
                                    <div class=""col-sm-2"">
                                        <input type=""text"" class=""form-control"" autocomplete=""off"" name=""tim"" im-insert=""true"" placeholder=""Tìm kiếm thông tin khách hàng"">
                                    </div>
                                    <div class=""col-sm-2"">
                                        <button type=""button"" class=""btn btn-primary btn-sm wd-40p"" id=""btnOtherSearch"">
                                            <i class=""fa fa-search""></i>
                                        </button>
                                        <button type=""button"" class=""btn btn-primary btn-sm wd-40p"" id=""btnThemMoiKhachHang"">
                 ");
            WriteLiteral(@"                           <i class=""fa fa-plus""></i>
                                        </button>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-12 mt-2"">
                                        <div id=""gridViewTkiemKH"" style=""box-sizing:inherit""></div>
                                        <button type=""button"" class=""btn btn-primary btn-sm"" id=""btnTiepTheo"" style="" float: right; margin-right: 15px; margin-top:-10px;"">
                                            Tiếp theo &nbsp;&nbsp;<i class=""fas fa-chevron-right""></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <form name=""frmSaveQLKHSearch"" id=""frmSaveQLKHSearch"" style=""display:none;"" method=""post"">
                                <input type=""hidde");
            WriteLiteral(@"n"" name=""pm"" value=""BT"" />
                                <input type=""hidden"" name=""so_id"" />
                                <input type=""hidden"" name=""ma"" />
                                <div class=""row"">
                                    <div class=""col-sm-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Đối tác</label>
                                            <select class=""select2 form-control custom-select select2-hidden-accessible"" required name=""ma_doi_tac"" style=""width: 100%; height:36px;""></select>
                                        </div>
                                    </div>
                                    <div class=""col-sm-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Mã chi nhánh</label>
                                            <select class=""select2 form-control custom-select ");
            WriteLiteral(@"select2-hidden-accessible"" required name=""ma_chi_nhanh"" style=""width: 100%; height:36px;""></select>
                                        </div>
                                    </div>
                                    <div class=""col-sm-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Loại khách hàng</label>
                                            <select class=""select2 form-control custom-select select2-hidden-accessible"" required name=""loai_kh"" style=""width: 100%; height:36px;"">
                                                <option");
            BeginWriteAttribute("value", " value=\"", 6345, "\"", 6353, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn khách hàng</option>
                                                <option value=""T"">Tổ chức</option>
                                                <option value=""C"">Cá nhân</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-sm-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Mã khách hàng</label>
                                            <input type=""text"" maxlength=""20"" autocomplete=""off"" required name=""ma"" class=""form-control"" placeholder=""VD: KH001"">
                                        </div>
                                    </div>
                                    <div class=""col-sm-4"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Tên khách hàng");
            WriteLiteral(@"</label>
                                            <input type=""text"" maxlength=""250"" autocomplete=""off"" name=""ten"" required class=""form-control"" placeholder=""VD: Nguyễn Văn A"">
                                        </div>
                                    </div>
                                    <div class=""col-sm-8"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Địa chỉ</label>
                                            <input type=""text"" maxlength=""250"" autocomplete=""off"" required name=""dchi"" placeholder=""VD: xã/phường/quận/thành phố..."" class=""form-control"">
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"" style=""margin-top: 5px;"">
                                    <div class=""col-sm-4"" id=""mst_search"">
                                        <div class=""form-group"">
");
            WriteLiteral("                                            <label class=\"_required\">Mã số thuế</label>\r\n                                            <input type=\"text\" maxlength=\"20\" autocomplete=\"off\" name=\"mst\"");
            BeginWriteAttribute("required", " required=\"", 8598, "\"", 8609, 0);
            EndWriteAttribute();
            WriteLiteral(@" class=""form-control text"" placeholder=""Mã số thuế"">
                                        </div>
                                    </div>
                                    <div class=""col-sm-4"" id=""cmt_search"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Chứng minh thư</label>
                                            <input type=""text"" fn-validate=""validateCMTControl"" maxlength=""20"" autocomplete=""off"" name=""cmt""");
            BeginWriteAttribute("required", " required=\"", 9131, "\"", 9142, 0);
            EndWriteAttribute();
            WriteLiteral(@" class=""form-control text"" placeholder=""Chứng minh thư"">
                                        </div>
                                    </div>
                                    <div class=""col-sm-4"">
                                        <div class=""form-group"">
                                            <label>Email</label>
                                            <div class=""input-group"">
                                                <input type=""text"" fn-validate=""validateEmailControl"" autocomplete=""off"" name=""email"" maxlength=""250"" class=""form-control email-inputmask"" im-insert=""true"" placeholder=""Email"">
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-sm-4"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Điện thoại</label>
                          ");
            WriteLiteral("                  <div class=\"input-group\">\r\n                                                <input type=\"text\" fn-validate=\"validatePhoneControl\" autocomplete=\"off\" class=\"form-control phone\" maxlength=\"20\"");
            BeginWriteAttribute("required", " required=\"", 10374, "\"", 10385, 0);
            EndWriteAttribute();
            WriteLiteral(@" name=""d_thoai"" im-insert=""true"" placeholder=""VD: 0968xxxxxx"">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"" style=""margin-top: 5px;"">
                                    <div class=""col-sm-4"">
                                        <div class=""form-group"">
                                            <label");
            BeginWriteAttribute("class", " class=\"", 10886, "\"", 10894, 0);
            EndWriteAttribute();
            WriteLiteral(@">Liên hệ</label>
                                            <input type=""text"" maxlength=""100"" autocomplete=""off"" name=""lhe"" class=""form-control"" placeholder=""Liên hệ"">
                                        </div>
                                    </div>
                                    <div class=""col-sm-4"">
                                        <div class=""form-group"">
                                            <label");
            BeginWriteAttribute("class", " class=\"", 11335, "\"", 11343, 0);
            EndWriteAttribute();
            WriteLiteral(@">Email liên hệ</label>
                                            <div class=""input-group"">
                                                <input type=""text"" autocomplete=""off"" fn-validate=""validateEmailControl"" name=""email_lhe"" maxlength=""250"" class=""form-control email-inputmask"" im-insert=""true"" placeholder=""Email liên hệ"">
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-sm-4"">
                                        <div class=""form-group"">
                                            <label");
            BeginWriteAttribute("class", " class=\"", 11997, "\"", 12005, 0);
            EndWriteAttribute();
            WriteLiteral(@">Điện thoại liên hệ</label>
                                            <div class=""input-group"">
                                                <input type=""text"" autocomplete=""off"" fn-validate=""validatePhoneControl"" class=""form-control phone"" maxlength=""20"" name=""dthoai_lhe"" im-insert=""true"" placeholder=""VD: 0968xxxxxx"">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"" style=""margin-top: 5px;"">
                                    <div class=""col-sm-12"">
                                        <div class=""form-group green-border-focus"">
                                            <label>Nội dung</label>
                                            <textarea class=""form-control"" autocomplete=""off"" rows=""9"" maxlength=""1000"" name=""nd"" placeholder=""Nội dung...""></textarea>
                                        </div>
   ");
            WriteLiteral(@"                                 </div>
                                </div>
                            </form>

                            <div class=""modal-footer"" style=""margin-top: 5px;"" id=""btnFooter"">
                                <button type=""button"" class=""btn btn-primary btn-sm wd-90"" id=""btnSaveQLKHSearch"">
                                    <i class=""fa fa-save mr-2""></i> Lưu
                                </button>
                                <button type=""button"" class=""btn btn-primary btn-sm wd-90"" id=""btnHuyThemMoiKH"">
                                    <i class=""fa fa-times mr-2""></i> Hủy
                                </button>
                            </div>
                        </div>
                        <div class=""tab-pane"" role=""tabpanel"" id=""tabThongTinHD"">
                            <form name=""frmHopDong"" method=""post"">
                                <input type=""hidden"" name=""so_id"" />
                                <input type=""hidden"" nam");
            WriteLiteral(@"e=""so_id_g"" />
                                <input type=""hidden"" name=""so_id_d"" />
                                <input type=""hidden"" name=""so_hd_sdbs"" />
                                <input type=""hidden"" name=""ma_kh"" />
                                <input type=""hidden"" name=""so_id_doitac"">
                                <input type=""hidden"" name=""so_luong_dt"">
                                <input type=""hidden"" name=""tong_phi"">
                                <div class=""row"">
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Đối tác</label>
                                            <select class=""select2 form-control custom-select"" required name=""ma_doi_tac_ql"" style=""width:100%""></select>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
       ");
            WriteLiteral(@"                                 <div class=""form-group"">
                                            <label class=""_required"">Chi nhánh</label>
                                            <select class=""select2 form-control custom-select"" required name=""ma_chi_nhanh_ql"" style=""width:100%""></select>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Phòng</label>
                                            <div class=""input-group"" style=""cursor:pointer"">
                                                <select class=""select2 form-control custom-select"" required name=""phong"" style=""width:100%"">
                                                    <option");
            BeginWriteAttribute("value", " value=\"", 15976, "\"", 15984, 0);
            EndWriteAttribute();
            WriteLiteral(@" selected>Chọn phòng ban</option>
                                                </select>
                                                <div class=""input-group-append"">
                                                    <label class=""input-group-text"">
                                                        <a href=""javascript:void(0)"" id=""btnThemDanhMucPhongBan"">
                                                            <i class=""fas fa-plus-square"" title=""Thêm phòng ban""></i>
                                                        </a>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label");
            BeginWriteAttribute("class", " class=\"", 16978, "\"", 16986, 0);
            EndWriteAttribute();
            WriteLiteral(@">Khách hàng</label>
                                            <input type=""text"" autocomplete=""off"" class=""form-control"" readonly name=""khach_hang"">
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Số hợp đồng</label>
                                            <input type=""text"" autocomplete=""off"" class=""form-control"" maxlength=""50"" required name=""so_hd"" placeholder=""Số hợp đồng"">
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Kiểu hợp đồng</label>
");
            WriteLiteral("                                            <select class=\"select2 form-control custom-select\" required name=\"kieu_hd\" style=\"width:100%\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 18206, "\"", 18214, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn kiểu hợp đồng</option>
                                                <option value=""G"">Gốc</option>
                                                <option value=""B"">Bổ sung</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Số hợp đồng gốc</label>
                                            <input type=""text"" class=""form-control"" autocomplete=""off"" placeholder=""Số hợp đồng gốc"" maxlength=""50"" readonly name=""so_hd_goc"">
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label>Nhóm sản phẩm</label>
                   ");
            WriteLiteral("                         <select class=\"select2 form-control custom-select select2-hidden-accessible\" name=\"nv\" style=\"width: 100%; height:36px;\">\r\n                                                <option");
            BeginWriteAttribute("value", " value=\"", 19442, "\"", 19450, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn nhóm sản phẩm</option>
                                                <option value=""HANGHOA"">Hàng hóa</option>
                                                <option value=""TAISAN"">Tài sản</option>
                                                <option value=""KYTHUAT"">Kỹ thuật</option>
                                                <option value=""HONHOP"">Hỗn hợp</option>
                                                <option value=""TRACHNHIEM"">Trách nhiệm</option>
                                                <option value=""TAUTHUYEN"">Tàu thuyền</option>
                                                <option value=""XEMAY"">Xe máy</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div class=""row"">
                                    <div class=""col-3"">
                                        <div class=""form-gro");
            WriteLiteral(@"up"">
                                            <label class=""_required"">Ngày cấp</label>
                                            <div class=""input-group"">
                                                <input type=""text"" autocomplete=""off"" class=""form-control datepicker"" required display-format=""date"" value-format=""number"" name=""ngay_cap"" placeholder=""mm/dd/yyyy"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Ngày hiệu lực</label>
                        ");
            WriteLiteral(@"                    <div class=""input-group"">
                                                <input type=""text"" autocomplete=""off"" class=""form-control datepicker"" display-format=""date"" value-format=""number"" name=""ngay_hl"" placeholder=""mm/dd/yyyy"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Ngày kết thúc</label>
                                            <div class=""input-group"">
                                                <input type=""text"" autocomplete=");
            WriteLiteral(@"""off"" class=""form-control datepicker"" display-format=""date"" value-format=""number"" name=""ngay_kt"" placeholder=""mm/dd/yyyy"">
                                                <div class=""input-group-append"">
                                                    <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class=""col-3"">
                                        <div class=""form-group"">
                                            <label class=""_required"">Trạng thái</label>
                                            <select class=""select2 form-control custom-select"" required name=""trang_thai"" style=""width:100%"">
                                                <option");
            BeginWriteAttribute("value", " value=\"", 23464, "\"", 23472, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn trạng thái</option>
                                                <option value=""D"">Đã duyệt</option>
                                                <option value=""C"">Chưa duyệt</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class=""modal-footer"" style=""margin-top: 10px;"">
                                <button type=""button"" class=""btn btn-primary btn-sm ml-2"" id=""btnLuuHD"">
                                    <i class=""fa fa-save""></i>&nbsp;&nbsp;Lưu hợp đồng
                                </button>
                                <button type=""button"" class=""btn btn-primary btn-sm"" id=""btnQuayLai"">
                                    <i class=""fas fa-chevron-left""></i>&nbsp;&nbsp; Quay lại
                                </button>
                            </div>
      ");
            WriteLiteral(@"                  </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>


<div class=""modal fade bs-example-modal-lg"" id=""modalSDBS"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog modal-lg"" role=""document"">
        <div class=""modal-content"" style=""margin-top:70px;"">
            <div class=""modal-header py-2"">
                <h4 class=""modal-title"">Thông tin sửa đổi bổ sung</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
            </div>
            <div class=""modal-body p-2"">
                <div class=""row"">
                    <div class=""col-12"">
                        <div class=""table-responsive scrollable"" style=""max-height: 265px;"">
                            <table id=""btnSDBS"" class=""table table-bordered fixed-header"" style=""width: 1");
            WriteLiteral(@"00%; height: 80px;"">
                                <thead class=""font-weight-bold text-center uppercase"">
                                    <tr>
                                        <th style=""width:10%"">Số hợp đồng</th>
                                        <th style=""width:10%"">Kiểu hợp đồng</th>
                                        <th style=""width:10%"">Ngày cấp</th>
                                    </tr>
                                </thead>
                                <tbody id=""tableSDBS"">
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class=""modal fade bs-example-modal-lg"" id=""modalNhapMaDoiTacPhong"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog modal-lg"" role=""document"">
        <div class=""modal-cont");
            WriteLiteral(@"ent"">
            <form name=""frmLuuThongTinDoiTacPhong"" method=""post"">
                <div class=""modal-header"">
                    <h4 class=""modal-title"">Thông tin phòng ban</h4>
                    <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
                </div>
                <div class=""modal-body"">
                    <div class=""row"">
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Đối tác</label>
                                <select class=""select2 form-control custom-select"" required name=""ma_doi_tac"" style=""width: 100%; height:36px;""></select>
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Chi nhánh</label>
        ");
            WriteLiteral(@"                        <select class=""select2 form-control custom-select"" required name=""ma_chi_nhanh"" style=""width: 100%; height: 36px;""></select>
                            </div>
                        </div>
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Trạng thái</label>
                                <select class=""select2 form-control custom-select"" name=""trang_thai"" style=""width: 100%; height:36px;"">
                                    <option");
            BeginWriteAttribute("value", " value=\"", 28146, "\"", 28154, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn trạng thái</option>
                                    <option value=""0"">Ngưng sử dụng</option>
                                    <option value=""1"">Đang sử dụng</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div class=""row mt-2"">
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <label class=""_required"">Mã phòng ban</label>
                                <input type=""text"" maxlength=""20"" name=""ma"" autocomplete=""off"" required class=""form-control"" placeholder=""Mã phòng ban"">
                            </div>
                        </div>
                        <div class=""col-sm-8"">
                            <div class=""form-group"">
                                <label class=""_required"">Tên phòng ban</label>
                                <input type=""text"" maxlength=""250"" name=""t");
            WriteLiteral(@"en"" autocomplete=""off"" required class=""form-control"" placeholder=""Tên phòng ban"">
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""modal-footer"">
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" id=""btnLuuThongTinDoiTacPhong""><i class=""fa fa-save""></i> Lưu</button>
                    <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" data-dismiss=""modal""><i class=""fas fa-window-close""></i> Đóng</button>
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
