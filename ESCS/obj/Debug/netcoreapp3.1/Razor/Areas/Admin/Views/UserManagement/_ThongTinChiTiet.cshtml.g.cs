#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\UserManagement\_ThongTinChiTiet.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "01fe58fc86eec9efc0dd18ab680229654be9ba05"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_UserManagement__ThongTinChiTiet), @"mvc.1.0.view", @"/Areas/Admin/Views/UserManagement/_ThongTinChiTiet.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"01fe58fc86eec9efc0dd18ab680229654be9ba05", @"/Areas/Admin/Views/UserManagement/_ThongTinChiTiet.cshtml")]
    public class Areas_Admin_Views_UserManagement__ThongTinChiTiet : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<style>
    .custom-table th {
        color: #000080;
    }

    .custom-table > thead > tr {
        background-color: #e8eef3 !important
    }

    .toggler {
        display: none;
    }

    .toggler1 {
        display: table-row;
    }

    #pqcn_div {
        height: 55vh;
    }

    ");
            WriteLiteral(@"@media only screen and (max-width: 1366px) {
        #pqcn_div {
            height: 47vh;
        }
    }
</style>
<div id=""modalNhapNguoiDung"" class=""esmodal fade"" tabindex=""-1"" data-keyboard=""false"" role=""dialog"" aria-hidden=""true"">
    <div class=""esmodal-dialog"">
        <div class=""esmodal-content"">
            <div class=""esmodal-header py-1"">
                <h4 class=""esmodal-title"">Thông tin người dùng <span id=""modal-user-log"" style=""font-size: 14px; font-style: italic;""></span></h4>
                <button type=""button"" class=""close"" data-dismiss=""esmodal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""esmodal-body"" style=""background-color:#54667a0a"">
                <div class=""row"">
                    <div class=""col-12 info-tab"">
                        <div class=""card border mb-0 p-2"">
                            <div class=""card-body p-1"">
                                <form name=""frmLuuThongTinNguoiDung"" method=""post"">
                        ");
            WriteLiteral(@"            <input type=""hidden"" name=""pm"" value=""BT"" />
                                    <input type=""hidden"" name=""trang_thai"" value=""D"" />
                                    <div class=""row"">
                                        <div class=""col-sm-2"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Công ty</label>
                                                <select class=""select2 form-control custom-select"" required name=""ma_doi_tac"" style=""width: 100%; height:36px;""></select>
                                            </div>
                                        </div>
                                        <div class=""col-sm-2"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Chi nhánh</label>
                                                <select class=""select2 form-control custom-select"" re");
            WriteLiteral(@"quired name=""ma_chi_nhanh"" style=""width: 100%; height:36px;""></select>
                                            </div>
                                        </div>
                                        <div class=""col-sm-2"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Phòng</label>
                                                <select class=""select2 form-control custom-select"" required name=""phong"" style=""width: 100%; height:36px;""></select>
                                            </div>
                                        </div>
                                        <div class=""col-sm-2"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Tên người dùng</label>
                                                <input type=""text"" maxlength=""100"" name=""ten"" autocomplete=""off"" required class=""form");
            WriteLiteral(@"-control"" placeholder=""VD: Nguyễn Văn A"">
                                            </div>
                                        </div>
                                        <div class=""col-sm-1"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Chức danh</label>
                                                <select class=""select2 form-control custom-select"" required name=""ma_chuc_danh"" style=""width: 100%; height:36px;""></select>
                                            </div>
                                        </div>
                                        <div class=""col-sm-1"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Điện thoại</label>
                                                <div class=""input-group"">
                                                    <input type=""text"" class=""fo");
            WriteLiteral("rm-control\" maxlength=\"11\"");
            BeginWriteAttribute("required", " required=\"", 4436, "\"", 4447, 0);
            EndWriteAttribute();
            WriteLiteral(@" name=""dthoai"" im-insert=""true"" placeholder=""VD: 0968xxxxxx"">
                                                </div>
                                            </div>
                                        </div>
                                        <div class=""col-sm-2"">
                                            <div class=""form-group"">
                                                <label");
            BeginWriteAttribute("class", " class=\"", 4855, "\"", 4863, 0);
            EndWriteAttribute();
            WriteLiteral(@">Nhóm quyền</label>
                                                <div class=""input-group"">
                                                    <select class=""select2 form-control custom-select"" name=""nhom_quyen"" style=""width: 100%; height:36px;"">
                                                    </select>
                                                    <div class=""input-group-append"">
                                                        <label class=""input-group-text"" for=""lh_nv"">
                                                            <a href=""#"" id=""btnThemNhomQuyenCt"" title=""Thêm chi tiết nhóm quyền"">
                                                                <i class=""fas fa-plus""></i>
                                                            </a>
                                                        </label>
                                                    </div>
                                                </div>
                                            </di");
            WriteLiteral(@"v>
                                        </div>
                                        <div class=""col-sm-2"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Tài khoản</label>
                                                <input type=""text"" maxlength=""50"" name=""ma"" autocomplete=""off"" required class=""form-control email-inputmask"" placeholder=""Tài khoản"">
                                            </div>
                                        </div>
                                        <div class=""col-sm-2"">
                                            <div class=""form-group"" id=""divMatKhau"">
                                                <label class=""_required"">Mật khẩu</label>
                                                <input type=""password"" maxlength=""100"" autocomplete=""off"" name=""mat_khau"" required class=""form-control"">
                                            </div>
                ");
            WriteLiteral(@"                        </div>

                                        <div class=""col-sm-2"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Email</label>
                                                <input type=""text"" name=""email"" fn-validate=""validateEmailControl"" autocomplete=""off"" maxlength=""50"" required class=""form-control email-inputmask"" placeholder=""Email"">
                                            </div>
                                        </div>
                                        <div class=""col-sm-2"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Ngày hiệu lực</label>
                                                <div class=""input-group"">
                                                    <input type=""text"" name=""ngay_hl"" display-format=""date"" value-format=""number"" required class=""");
            WriteLiteral(@"form-control datepicker"" placeholder=""Ngày hiệu lực"">
                                                    <div class=""input-group-append"">
                                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=""col-sm-2"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Ngày kết thúc</label>
                                                <div class=""input-group"">
                                                    <input type=""text"" name=""ngay_kt"" display-format=""date"" value-format=""number"" required class=""form-control datepicker"" placeholder=""Ngày kết thúc"">
                                ");
            WriteLiteral(@"                    <div class=""input-group-append"">
                                                        <span class=""input-group-text""><span class=""ti-calendar""></span></span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class=""col-sm-2"">
                                            <div class=""form-group"">
                                                <label class=""_required"">Loại tài khoản</label>
                                                <select class=""select2 form-control custom-select"" required name=""loai_tk"" style=""width: 100%; height:36px;"">
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                ");
            WriteLiteral(@"    <div class=""row"" id=""rowPhanQuyen"">
                                        <div class=""col-md-12"">
                                            <ul class=""nav nav-pills"" role=""tablist"" style=""background-color:#f8f9fa"">
                                                <li class=""nav-item "" style=""font-weight:bold"">
                                                    <a class=""nav-link active"" id=""home-tab"" data-toggle=""tab"" href=""#phan_quyen_chuc_nang"" role=""tab"" aria-controls=""home"" aria-selected=""true"">
                                                        <i class=""fas fa-align-justify mr-2""></i>Phân quyền chức năng/ đơn vị quản lý
                                                    </a>
                                                </li>
");
            WriteLiteral(@"                                            </ul>
                                            <div class=""tab-content"">
                                                <div class=""tab-pane active"" id=""phan_quyen_chuc_nang"" role=""tabpanel"" aria-labelledby=""home-tab"">
                                                    <div class=""row scrollable"" style=""margin-top:10px;"" id=""pqcn_div"">
                                                        <div class=""col-6"">
                                                            <div class=""table-responsive"" id=""tblTinhToan"" style=""height:55vh;"">
                                                                <table class=""table table-bordered fixed-header custom-table"">
                                                                    <thead>
                                                                        <tr>
                                                                            <th style=""width:47px"" class=""text-center"">
                      ");
            WriteLiteral(@"                                                          <div class=""custom-control custom-checkbox"" style=""padding-left:26px;"">
                                                                                    <input type=""checkbox"" onchange=""onChangeTatCa(this)"" id=""chon_tat_ca_dvi"" class=""custom-control-input"">
                                                                                    <label class=""custom-control-label"" for=""chon_tat_ca_dvi""><b style=""font-weight:bold"">&nbsp;</b></label>
                                                                                </div>
                                                                            </th>
                                                                            <th class=""text-center"">Tên đơn vị</th>
                                                                            <th class=""text-center"">Công ty</th>
                                                                        </tr>
                                ");
            WriteLiteral(@"                                    </thead>
                                                                    <tbody id=""tableDonViQuanLy"">
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                        <div class=""col-6"">
                                                            <div class=""table-responsive"" style=""max-height:55vh"">
                                                                <table class=""table table-bordered fixed-header"">
                                                                    <thead class=""font-weight-bold"">
                                                                        <tr class=""text-center uppercase"">
                                                                            <");
            WriteLiteral(@"th style=""width:20px"">STT</th>
                                                                            <th>Phân quyền chức năng/Tên chức năng</th>
                                                                            <th style=""width:60px"">
                                                                                <div class=""custom-control custom-checkbox"">
                                                                                    <input type=""checkbox"" onchange=""onNhapTatCaChange(this)"" id=""nhap_tat_ca"" class=""custom-control-input"">
                                                                                    <label class=""custom-control-label"" for=""nhap_tat_ca""><b style=""font-weight:bold"">Nhập</b></label>
                                                                                </div>
                                                                            </th>
                                                                            <th style=""width:60px"">");
            WriteLiteral(@"
                                                                                <div class=""custom-control custom-checkbox"">
                                                                                    <input type=""checkbox"" onchange=""onXemTatCaChange(this)"" id=""xem_tat_ca"" class=""custom-control-input"">
                                                                                    <label class=""custom-control-label"" for=""xem_tat_ca""><b style=""font-weight:bold"">Xem</b></label>
                                                                                </div>
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody id=""bodyTablePhanQuyen""></tbody>
                                                                </table>
               ");
            WriteLiteral("                                             </div>\r\n                                                        </div>\r\n\r\n                                                    </div>\r\n                                                </div>\r\n");
            WriteLiteral(@"                                            </div>
                                        </div>
                                    </div>
                                    <div class=""row mg-t-15"">
                                        <div class=""col-8"">
                                            <button type=""button"" class=""btn btn-primary btn-sm wd-150"" id=""btnKhoaTaiKhoan""><i class=""fas fa-lock mr-1""></i> Khóa tài khoản</button>
                                            <button style=""display: none"" type=""button"" class=""btn btn-primary btn-sm wd-120"" id=""btnPhanCap""><i class=""fas fa-window-restore mr-1""></i> Phân cấp</button>
                                            <button type=""button"" class=""btn btn-primary btn-sm wd-120"" id=""btnPhanCapClone""><i class=""fas fa-window-restore mr-1""></i> Phân cấp</button>
                                            <button type=""button"" class=""btn btn-primary btn-sm wd-150"" id=""btnPhanChiaDiaBan""><i class=""fas fa-map-marker-alt mr-1""></i> Phân chia đị");
            WriteLiteral(@"a bàn</button>
                                            <button type=""button"" class=""btn btn-primary btn-sm wd-90 d-none"" data-dismiss=""modal""><i class=""fas fa-window-close mr-1""></i> Đóng</button>
                                        </div>
                                        <div class=""col-4"" style=""text-align:right"">
                                            <button type=""button"" class=""btn btn-primary btn-sm wd-150"" id=""btnMoTaiKhoan""><i class=""fas fa-lock-open mr-1""></i> Mở tài khoản</button>
                                            <button type=""button"" class=""btn btn-primary btn-sm wd-80"" id=""btnCopyThongTinNguoiDung""><i class=""fa fa-clone mr-1""></i> Copy</button>
                                            <button type=""button"" class=""btn btn-primary btn-sm wd-80"" id=""btnLuuThongTinNguoiDung""><i class=""fa fa-save mr-1""></i> Lưu</button>
");
            WriteLiteral(@"                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div class=""modal fade bs-example-modal-lg"" id=""modalThemNhomQuyenChiTiet"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog modal-lg"" role=""document"" style=""max-width: 70%;"">
        <div class=""modal-content"">
            <div class=""modal-header"" style=""padding: 0.5rem 1rem;"">
                <h4 class=""modal-title"">Thêm nhóm quyền chi tiết</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-label=""Close""><span aria-hidden=""true"">&times;</span></button>
            </div>
            <div class=""modal-body"">
                <form name=""frmThemNhomQuyenChiTiet"" method=""post"">
            WriteLiteral("\n                    <div class=\"row\">\r\n                        <div class=\"col-3\">\r\n                            <div class=\"form-group\">\r\n                                <label");
            BeginWriteAttribute("class", " class=\"", 20310, "\"", 20318, 0);
            EndWriteAttribute();
            WriteLiteral(@">Nhóm quyền</label>
                                <div class=""form-group"">
                                    <select class=""select2 form-control custom-select"" name=""nhom"" style=""width: 100%; height:36px;"">
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class=""col-3"">
                            <div class=""form-group"">
                                <label class=""_required"">Mã nhóm</label>
                                <div class=""form-group"">
                                    <input type=""text"" autocomplete=""off"" required class=""form-control text"" name=""nhom_moi"" placeholder=""Nhập mã nhóm ..."">
                                </div>
                            </div>
                        </div>
                        <div class=""col-4"">
                            <div class=""form-group"">
                                <label");
            BeginWriteAttribute("class", " class=\"", 21322, "\"", 21330, 0);
            EndWriteAttribute();
            WriteLiteral(@">Tên nhóm</label>
                                <div class=""form-group"">
                                    <input type=""text"" autocomplete=""off"" required class=""form-control text"" name=""ten"" placeholder=""Nhập tên nhóm ..."">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""table-responsive scrollable"">
                        <div class=""table-responsive"" style=""max-height:55vh"">
                            <table class=""table table-bordered fixed-header"">
                                <thead class=""font-weight-bold"">
                                    <tr class=""text-center uppercase"">
                                        <th style=""width:20px"">STT</th>
                                        <th>Phân quyền chức năng/Tên chức năng</th>
                                        <th style=""width:60px"">
                                            <div class=""custom-control cus");
            WriteLiteral(@"tom-checkbox"">
                                                <input type=""checkbox"" onchange=""onNhapTatCaChangeCauHinh(this)"" id=""nhap_tat_ca_cau_hinh"" class=""custom-control-input"">
                                                <label class=""custom-control-label"" for=""nhap_tat_ca_cau_hinh""><b style=""font-weight:bold"">Nhập</b></label>
                                            </div>
                                        </th>
                                        <th style=""width:60px"">
                                            <div class=""custom-control custom-checkbox"">
                                                <input type=""checkbox"" onchange=""onXemTatCaChangeCauHinh(this)"" id=""xem_tat_ca_cau_hinh"" class=""custom-control-input"">
                                                <label class=""custom-control-label"" for=""xem_tat_ca_cau_hinh""><b style=""font-weight:bold"">Xem</b></label>
                                            </div>
                                        </th>
     ");
            WriteLiteral(@"                               </tr>
                                </thead>
                                <tbody id=""bodyTablePhanQuyenCauHinh""></tbody>
                            </table>
                        </div>
                    </div>
                </form>
            </div>
            <div class=""modal-footer"">
                <button class=""btn btn-outline-primary btn-sm wd-85 mg-t-22 float-right"" id=""btnXoaNhomQuyen"">
                    <i class=""fas fa-trash-alt mr-2""></i>Xóa
                </button>
                <button class=""btn btn-primary btn-sm wd-85 mg-t-22 float-right"" id=""btnLuuNhomQuyen"">
                    <i class=""fas fa-save mr-2""></i>Lưu
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-110 float-right"" id=""btnLuuDongNhomQuyen"">
                    <i class=""fas fa-hdd mr-2""></i>Lưu & đóng
                </button>
                <button type=""button"" class=""btn btn-primary btn-sm wd-85 float-right"" ");
            WriteLiteral("data-dismiss=\"modal\">\r\n                    <i class=\"fas fa-window-close mr-2\"></i>Đóng\r\n                </button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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