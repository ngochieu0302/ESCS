#pragma checksum "D:\ESCS\ESCS\Areas\MotorcycleClaim\Views\MotorcycleInvestigation\_MotorcycleClaimContentStep3.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f3a739ad11a85494d318e53533286bccf07cfeb0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_MotorcycleClaim_Views_MotorcycleInvestigation__MotorcycleClaimContentStep3), @"mvc.1.0.view", @"/Areas/MotorcycleClaim/Views/MotorcycleInvestigation/_MotorcycleClaimContentStep3.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f3a739ad11a85494d318e53533286bccf07cfeb0", @"/Areas/MotorcycleClaim/Views/MotorcycleInvestigation/_MotorcycleClaimContentStep3.cshtml")]
    public class Areas_MotorcycleClaim_Views_MotorcycleInvestigation__MotorcycleClaimContentStep3 : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""row mg-t-10"" id=""divCarClaimContentStep3HinhAnh"">
    <div class=""col-9 pr-0"">
        <div class=""card mb-0"">
            <div class=""card-body p-0"">
                <div class=""border rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Hình ảnh hồ sơ</h5>
                        <div class=""btn-group float-right"">
                            <a class=""btn btn-light rounded py-0"" style=""font-weight:bold"" data-toggle=""dropdown"" data-display=""static"" aria-haspopup=""true"" aria-expanded=""false"">
                                <span style=""font-size:13px; color:#009efb"">Bổ sung thông tin đăng ký, đăng kiểm, bên tham gia giám định</span> <i class=""fal fa-ellipsis-v""></i>
                            </a>
                            <div class=""dropdown-menu dropdown-menu-right border"">
                                <button class=""dropdown-item"" type=""button"" data-id=""bs_tt_bang_lai_xe""
   ");
            WriteLiteral(@"                                     data-toggle=""popover-x"" data-placement=""top top-right"" data-target=""#AddLicenseInfo"" id=""btnShowFormBsBangLxe"" onclick=""loadFormBsThongTinBangLaiXe()"">
                                    Bổ sung thông tin bằng lái xe
                                </button>
                                <button class=""dropdown-item"" type=""button"" data-id=""bs_tt_dang_kiem_xe""
                                        data-toggle=""popover-x"" data-placement=""top top-right"" data-target=""#popoverAddRegistryInfo"" onclick=""loadFormBsThongTinDangKiem()"">
                                    Bổ sung thông tin đăng kiểm
                                </button>

                                <button class=""dropdown-item"" type=""button"" data-id=""bs_tt_ben_tg_gd""
                                        data-toggle=""popover-x"" data-placement=""top top-right"" data-target=""#AddBenThamGiaGiamDinh"" onclick=""loadFormBsThongTinBenTGGD()"">
                                    Bên thêm gia giám định");
            WriteLiteral(@"
                                </button>
                            </div>
                            <a class=""btn btn-light rounded py-0 font-weight-bold"" id=""image_fullsreen"">
                                <i class=""fas fa-expand-arrows-alt""></i>
                            </a>
                        </div>
                    </div>
                    <div class=""row"">
                        <div class=""col-12"">
                            <div id=""img-container"" style=""height:62vh""></div>
                        </div>
                    </div>
                </div>
                <div class=""row"" style=""margin-top: -32px; margin-left: -9px;"">
                    <div class=""col-6"">
                        <form class=""form-inline"" name=""frmNgayChup"" method=""post"">
                            <div class=""form-group mb-2"">
                                <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width:95px; background: #54667a0a; border: none;"" name=""n");
            WriteLiteral(@"gay"" readonly placeholder=""Ngày chụp"">
                            </div>
                            <span style=""margin-top: -8px; font-weight: bold;"">-</span>
                            <div class=""form-group mb-2"">
                                <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width:127px; background: #54667a0a; border: none;"" name=""nsd"" readonly placeholder=""Người tải ảnh"">
                            </div>
                        </form>
                    </div>
                </div>
                <div class=""row"">
                    <div class=""col-6"">
                        <form class=""form-inline"" name=""frmToaDoAnh"" method=""post"">
                            <div class=""form-group mb-2"">
                                <label style=""padding-top:4px; padding-right:5px"">X:</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width:80px"" name=""kinh_do"" readonly placeholder=""Kinh độ"">
        ");
            WriteLiteral(@"                    </div>
                            <div class=""form-group mx-sm-3 mb-2"">
                                <label style=""padding-top:4px; padding-right:5px"">Y:</label>
                                <input type=""text"" autocomplete=""off"" class=""form-control"" style=""width:80px"" name=""vi_do"" readonly placeholder=""Vĩ độ"">
                            </div>
                            <div class=""form-group mb-2"">
                                <a href=""#"" id=""btnXemViTriChupAnh"" class=""mr-3""><i class=""fas fa-map-marker-alt"" title=""Xem chi tiết bản đồ""></i> Xem vị trí chụp ảnh</a>
                            </div>
                        </form>
                    </div>
                    <div class=""col-6"">
                        <div class=""form-group mb-2"">
                            <a href=""#"" id=""btnPhanLoaiHangMuc"" style=""padding-top:5px;"" class=""float-right""><i class=""fas fa-car-crash""></i> Phân loại</a>
                            <a href=""#"" id=""btnSoSanhDuLieu"" sty");
            WriteLiteral(@"le=""padding-top:5px;"" class=""float-right mr-3""><i class=""fas fa-adjust""></i> Đối chiếu dữ liệu</a>
                            <a href=""#"" id=""btnDanhGiaHienTruong"" style=""padding-top:5px;"" class=""float-right mr-3""><i class=""fas fa-comments""></i> Đánh giá hiện trường</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""col-3"">
        <div class=""card m-0"">
            <div class=""card-body p-0"">
                <div class=""border rounded"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">

                        <div class=""btn-group float-right"">
                            <a class=""btn btn-light rounded py-0"" id=""btnAnhHopDong"">
                                <i class=""fas fa-file-contract"" title=""Click để xem ảnh hợp đồng""></i>
                            </a>
                            <a class=""btn btn-light rounded py-0"" id=""btnTransImage");
            WriteLiteral(@"View"">
                                <i class=""fas fa-th""></i>
                            </a>
                        </div>
                        <div class=""btn-group float-right"">
                            <a class=""btn btn-light rounded py-0"" data-toggle=""dropdown"" data-display=""static"" aria-haspopup=""true"" aria-expanded=""false"">
                                <i class=""fal fa-ellipsis-v""></i>
                            </a>
                            <div class=""dropdown-menu dropdown-menu-right border"" id=""dsNhomAnh"">
                            </div>
                        </div>
                    </div>
                    <div class=""container-fluid scrollable"" id=""lstImage"" style=""height: 415px;"">
                        <div class=""row"">
                            <div class=""col-12 list-pictures"" id=""dsAnhTonThat"">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>");
            WriteLiteral(@"
        <div class=""container-fluid"">
            <div class=""row my-3"">
                <div class=""btn-group btn-group-justified"" role=""group"">
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Phân loại danh mục"" id=""btnPhanLoaiTonThat"">
                        <i class=""fas fa-atlas""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Tải xuống"" id=""btnDownLoadAnhDGTT"">
                        <i class=""fas fa-download""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Tải lên"" id=""btnUpLoadAnhDGTT"">
                        <i class=""fas fa-upload""></i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""In ảnh tổn thất"" id=""btnXemTaiLieu"">
                        <i class=""fas fa-print"">");
            WriteLiteral(@"</i>
                    </button>
                    <button type=""button"" class=""btn btn-outline-primary"" data-toggle=""tooltip"" title=""Xóa"" id=""btnXoaLoadAnhDGTT"">
                        <i class=""fas fa-trash-alt""></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<style>
    .divAnhPhanLoai img {
        width: 100%;
        height: 100%;
        border-radius: 10px;
    }

    .divAnhPhanLoai:hover {
        border: 2px solid #009efb;
    }

    .divAnhPhanLoai.active .divAnhPhanLoaiCheck {
        display: block;
    }

    .divAnhPhanLoai.active {
        border: 2px solid #009efb;
    }

    .divAnhPhanLoai {
        width: 62px;
        height: 62px;
        border-radius: 10px;
        border: 1px solid #e9ecef;
        float: left;
        margin-left: 5px;
        margin-bottom: 10px;
        cursor: pointer;
        position: relative;
    }

    .divAnhPhanLoaiCheck {
        width: 16px;
  ");
            WriteLiteral(@"      font-size: 16px;
        position: absolute;
        bottom: -3px;
        right: 2px;
        color: #00CC66;
        display: none;
    }

    .cursor-pointer {
        cursor: pointer;
    }

    .icon_plhm.active {
        color: #009efb;
        opacity: 1;
    }

    .icon_plhm {
        opacity: 0.5;
    }

    .plhm_mucdo_con {
        padding-left: 15px;
    }

    #tbDsPhanLoaiNhanh tr {
        cursor: pointer;
    }

    #divPhanLoaiXemAnh {
        position: relative;
    }

    .img-container-plhm {
        width: 95% !important;
        height: 100% !important;
    }
</style>
<div class=""row mg-t-5"" id=""divCarClaimContentStep3PhanLoai"" style=""display:none;height:73vh"">
    <div style=""width:100%;padding-left:15px; padding-right:15px;"">
        <form name=""frmPhanLoaiNhanh"" method=""post"">
            <div class=""row"">
                <div class=""col-3 pr-0"">
                    <div class=""form-group"">
                        <label class=""_requi");
            WriteLiteral("red\">Vụ tổn thất</label>\r\n                        <select class=\"select2 form-control custom-select\" required name=\"vu_tt\" style=\"width:100%\">\r\n                            <option");
            BeginWriteAttribute("value", " value=\"", 10419, "\"", 10427, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn vụ tổn thất</option>
                        </select>
                    </div>
                </div>
                <div class=""col-2 pr-0"">
                    <div class=""form-group"">
                        <label class=""_required"">Nhóm tài liệu</label>
                        <select class=""select2 form-control custom-select"" required name=""loai"" style=""width:100%"">
                            <option value=""TT"" selected=""selected"">Tổn thất</option>
                            <option value=""TL"">Giấy tờ, tài liệu</option>
                            <option value=""TC"">Toàn cảnh, hiện trường</option>
                        </select>
                    </div>
                </div>
                <div class=""col-2 pr-0"">
                    <div class=""form-group"">
                        <label class=""_required"">Nghiệp vụ</label>
                        <select class=""select2 form-control custom-select"" required name=""lh_nv"" style=""width:100%"">
                            <o");
            WriteLiteral("ption");
            BeginWriteAttribute("value", " value=\"", 11457, "\"", 11465, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn nghiệp vụ</option>
                        </select>
                    </div>
                </div>
                <div class=""col-5 pr-0"" style=""display:flex; padding-bottom:5px;"">
                    <a href=""#"" class=""mr-4"" style=""align-self:flex-end"" id=""btnXemViTriChupAnhPLHMNhanh"">
                        <i class=""fas fa-map-marker-alt"" title=""Xem chi tiết bản đồ""></i>
                        <span id=""plhm_nhanh_xem_vi_tri_anh"">Xem vị trí chụp ảnh</span>
                    </a>
                    <a href=""#"" style=""align-self:flex-end"" class=""float-right mr-5"" id=""btnSoSanhDuLieuPLHMNhanh"">
                        <i class=""fas fa-adjust""></i> Đối chiếu dữ liệu hồ sơ gốc
                    </a>
                    <a href=""#"" style=""align-self:flex-end"" class=""float-right mr-3"" id=""btnThoatPLHMNhanh""><i class=""fas fa-sign-out""></i> Thoát</a>
                </div>
            </div>
        </form>
    </div>
    <div class=""col-3 pr-0"">
        <div class=""card mb-0"">
");
            WriteLiteral(@"            <div class=""card-body p-0"">
                <div class=""border rounded"" style=""height:68vh"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Hình ảnh hồ sơ</h5>
                    </div>
                    <div class=""row"">
                        <div class=""col-12 mt-1"">
                            <div style=""max-height:465px;"" class=""scrollable list-pictures-plhm"" id=""divPLHMHinhAnh"">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""col-2 pr-0"">
        <div class=""card mb-0"">
            <div class=""card-body p-0"">
                <div class=""border rounded"" style=""height:44vh"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Hạng mục tổn thất</h5>
           ");
            WriteLiteral(@"         </div>
                    <div class=""row"">
                        <div class=""col-12"">
                            <input type=""text"" style=""z-index:99999999999;"" class=""form-control"" id=""inputPLHMTKiemHangMuc"" placeholder=""Nhập tên hạng mục""");
            BeginWriteAttribute("value", " value=\"", 13771, "\"", 13779, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                        </div>
                        <div class=""col-12"">
                            <div style=""padding:5px;max-height:260px;"" class=""scrollable"" id=""divPLHMHangMuc"">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=""card mb-0 mt-2"">
            <div class=""card-body p-0"">
                <div class=""border rounded"" style=""height:23vh"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Phương án khắc phục</h5>
                    </div>
                    <div class=""row"">
                        <div class=""col-12"">
                            <div style=""padding:5px;"" id=""plhmPAKhacPhuc"">
                                <p style=""margin-bottom: 2px;padding-left: 5px;font-weight: bold;"">
                                    <a href=""#"">PA khắc phục</a>
   ");
            WriteLiteral(@"                             </p>
                                <div>
                                    <div class=""form-check form-check-inline"" style=""margin-right:unset"">
                                        <input class=""form-check-input material-inputs with-gap"" checked=""checked"" type=""radio"" name=""plhmPASC"" id=""plhmPASC_S"" value=""S"">
                                        <label class=""form-check-label"" style=""font-size:12px; width: 113px;"" for=""plhmPASC_S"">Sửa chữa</label>
                                    </div>
                                    <div class=""form-check form-check-inline"" style=""margin-right:unset"">
                                        <input class=""form-check-input material-inputs with-gap"" type=""radio"" name=""plhmPASC"" id=""plhmPASC_T"" value=""T"">
                                        <label class=""form-check-label"" style=""font-size:12px;"" for=""plhmPASC_T"">Thay thế</label>
                                    </div>
                                </div>
      ");
            WriteLiteral(@"                          <p style=""margin-bottom: 2px;padding-left: 5px;font-weight: bold;"">
                                    <a href=""#"">Nơi sửa chữa</a>
                                </p>
                                <div>
                                    <div class=""form-check form-check-inline"" style=""margin-right:unset"">
                                        <input class=""form-check-input material-inputs with-gap"" checked=""checked"" type=""radio"" name=""plhmPAChinhHang"" id=""plhmPAChinhHang_K"" value=""K"">
                                        <label class=""form-check-label"" style=""font-size:12px; width: 113px;"" for=""plhmPAChinhHang_K"">Sửa chữa ngoài</label>
                                    </div>
                                    <div class=""form-check form-check-inline"" style=""margin-right:unset"">
                                        <input class=""form-check-input material-inputs with-gap"" type=""radio"" name=""plhmPAChinhHang"" id=""plhmPAChinhHang_C"" value=""C"">
                ");
            WriteLiteral(@"                        <label class=""form-check-label"" style=""font-size:12px;"" for=""plhmPAChinhHang_C"">Chính hãng</label>
                                    </div>
                                </div>
                                <p style=""margin-bottom: 2px;padding-left: 5px;font-weight: bold;"">
                                    <a href=""#"">Thu hồi vật tư</a>
                                </p>
                                <div>
                                    <div class=""form-check form-check-inline"" style=""margin-right:unset"">
                                        <input class=""form-check-input material-inputs with-gap"" checked=""checked"" type=""radio"" name=""plhmPAThuHoi"" id=""plhmPAThuHoi_K"" value=""K"">
                                        <label class=""form-check-label"" style=""font-size:12px; width: 113px;"" for=""plhmPAThuHoi_K"">Không</label>
                                    </div>
                                    <div class=""form-check form-check-inline"" style=""margin-r");
            WriteLiteral(@"ight:unset"">
                                        <input class=""form-check-input material-inputs with-gap"" type=""radio"" name=""plhmPAThuHoi"" id=""plhmPAThuHoi_C"" value=""C"">
                                        <label class=""form-check-label"" style=""font-size:12px;"" for=""plhmPAThuHoi_C"">Có</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""col-2 pr-0"">
        <div class=""card mb-0"">
            <div class=""card-body p-0"">
                <div class=""border rounded"" style=""height:44vh"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Mức độ tổn thất</h5>
                    </div>
                    <div class=""row"">
                        <div class=""col-12"">
                   ");
            WriteLiteral("         <input type=\"text\" style=\"z-index:99999999\" id=\"inputPLHMTKiemMucDo\" class=\"form-control\" placeholder=\"Nhập tên mức độ tổn thất\"");
            BeginWriteAttribute("value", " value=\"", 19037, "\"", 19045, 0);
            EndWriteAttribute();
            WriteLiteral(@" />
                        </div>
                        <div class=""col-12"">
                            <div style=""padding:5px;max-height:260px"" class=""scrollable"" id=""divPLHMMucDo"">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class=""card mb-0 mt-2"">
            <div class=""card-body p-0"">
                <div class=""border rounded"" style=""height:23vh"">
                    <div class=""d-flex justify-content-between align-items-center p-2 card-title-bg"">
                        <h5 class=""m-0"">Xác định chi phí</h5>
                    </div>
                    <div class=""row"">
                        <div class=""col-12"">
                            <div style=""padding-left:10px; padding-right:10px"">
                                <div class=""form-group"">
                                    <label");
            BeginWriteAttribute("for", " for=\"", 19999, "\"", 20005, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chi phí hệ thống xác định tự động</label>
                                    <input type=""text"" class=""form-control number"" id=""plhm-tien-tu-dong"" readonly=""readonly"" value=""0"" autocomplete=""off"" placeholder=""Chi phí hệ thống xác định tự động"">
                                </div>
                            </div>
                            <div style=""padding-left:10px; padding-right:10px"">
                                <div class=""form-group"">
                                    <label");
            BeginWriteAttribute("for", " for=\"", 20512, "\"", 20518, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chi phí giám định viên xác định</label>
                                    <input type=""text"" class=""form-control number"" id=""plhm-tien-gd"" autocomplete=""off"" value=""0"">
                                </div>
                            </div>
                            <div style=""padding-left:10px; padding-right:10px"">
                                <button type=""button"" class=""btn btn-primary btn-sm btn-block"" id=""btnLuuPhanLoaiNhanh"" title=""Lưu thông tin phân loại"">
                                    <i class=""fa fa-save mr-2""></i> Lưu
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class=""col-5 pr-0"">
        <div class=""card mb-0"">
            <div class=""card-body p-0"">
                <div class=""border rounded"">
                    <div class=""row"" style=""height:67.7vh"">
                        <div class=""col-12"" ");
            WriteLiteral(@"id=""divPhanLoaiDanhSach"">
                            <div class=""table-responsive scrollable"" style=""max-height:510px;"">
                                <table class=""table table-bordered fixed-header table-hover"">
                                    <thead class=""font-weight-bold"">
                                        <tr class=""text-center uppercase"">
                                            <th>Hạng mục</th>
                                            <th style=""width:165px"">Mức độ tổn thất</th>
                                            <th style=""width:90px"">Phương án</th>
                                            <th style=""width:94px"">Chi phí</th>
                                        </tr>
                                    </thead>
                                    <tbody id=""tbDsPhanLoaiNhanh"">
                                    </tbody>
                                    <tfoot>
                                        <tr class=""card-title-bg"">
                      ");
            WriteLiteral(@"                      <td colspan=""3"">
                                                Tổng chi phí dự kiến:
                                            </td>
                                            <td class=""text-right"" id=""tbDsPhanLoaiNhanhTongCong"">1.000.000</td>
                                        </tr>
                                        <tr class=""card-title-bg"">
                                            <td colspan=""4"" style=""font-size:10px; font-style:italic;"">
                                                (<span style=""color:red"">*</span>):
                                                <i class=""fas fa-tools ml-2 mr-1 icon_plhm""></i> <span class=""mr-1"">Sửa chữa</span>
                                                <i class=""fas fa-tools mr-1 icon_plhm active""></i> <span class=""mr-1"">Thay thế</span>
                                                <i class=""fad fa-car-garage mr-1 icon_plhm""></i> <span class=""mr-1"">Sửa chữa ngoài</span>
                                    ");
            WriteLiteral(@"            <i class=""fad fa-car-garage mr-1 icon_plhm active""></i> <span class=""mr-1"">Chính hãng</span>
                                                <i class=""fas fa-inbox-in mr-1 icon_plhm""></i> <span class=""mr-1"">Không thu hồi</span>
                                                <i class=""fas fa-inbox-in mr-1 icon_plhm active""></i> <span class=""mr-1"">Có thu hồi</span>
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </div>
                        </div>
                        <div class=""col-12"" id=""divPhanLoaiXemAnh"">
                            <button type=""button"" onclick=""anHienXemAnhPhanLoaiNhanh(false)"" class=""close"" style=""position:absolute; right:0px;right:20px; top:2px; z-index:9999999999;"">×</button>
                            <div id=""img-container-plhm"" style=""height:62vh""></div>
                        </div>
     ");
            WriteLiteral("               </div>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n");
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
