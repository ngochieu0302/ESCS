#pragma checksum "D:\ESCS\ESCS\Areas\Admin\Views\OpinionGroup\_Modal.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "47fb19536b738eb0570af0c29b2cc9ab93f2ed86"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_Admin_Views_OpinionGroup__Modal), @"mvc.1.0.view", @"/Areas/Admin/Views/OpinionGroup/_Modal.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"47fb19536b738eb0570af0c29b2cc9ab93f2ed86", @"/Areas/Admin/Views/OpinionGroup/_Modal.cshtml")]
    public class Areas_Admin_Views_OpinionGroup__Modal : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""modal fade bs-example-modal-lg"" id=""modalNhomTrinhYKien"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog modal-lg"" role=""document"" style=""max-width: 70%; margin:10px auto;"">
        <div class=""modal-content"" style=""border:3px solid #1e88e5;box-shadow: 1px 8px 10px 0px rgb(106 160 201);"">
            <div class=""modal-header py-1"" style=""background-color:#0069d9; cursor:pointer;border:unset;"">
                <h4 class=""modal-title"" style=""color:#fff"">Nhóm trình ý kiến</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body"" style=""padding-bottom: 0px;"">
                <form name=""frmModalNhomTrinhYKien"" method=""post"">
                    <div class=""row"">
                        <input type=""hidden"" name=""hanh_dong"" />
                        <input type=""hidden"" name=""can_bo_chon"" />
     ");
            WriteLiteral(@"                   <input type=""hidden"" name=""ma_doi_tac"" />
                        <input type=""hidden"" name=""so_id_hs"" />
                        <input type=""hidden"" name=""loai_trinh"" />
                        <input type=""hidden"" name=""so_id"" />
                        <div class=""col-sm-4"">
                            <div class=""form-group"">
                                <select class=""select2 form-control custom-select"" name=""ma_doi_tac"" style=""width: 100%; height:36px;""></select>
                            </div>
                        </div>
                        <div class=""col-sm-3"">
                            <div class=""form-group"">
                                <input type=""text"" onclick=""onModalXinYKienChonDonVi(this)"" style=""cursor:pointer"" autocomplete=""off"" name=""ma_chi_nhanh_duyet"" required class=""form-control"" placeholder=""Click chọn đơn vị duyệt"" readonly=""readonly"" />
                            </div>
                        </div>
                        <div c");
            WriteLiteral(@"lass=""col-sm-3"">
                            <input type=""text"" name=""tim"" autocomplete=""off"" placeholder=""Nhập mã cán bộ/tên cán bộ"" class=""form-control"">
                        </div>
                        <div class=""col-2"">
                            <button type=""button"" class=""btn btn-primary btn-sm wd-120"" id=""ModalXinYKien_btnTimKiemCanBo"">
                                <i class=""fas fa-search mr-2""></i>Tìm kiếm
                            </button>
                        </div>
                    </div>
                </form>
                <div class=""row"">
                    <div class=""col-12"">
                        <div class=""card"" style=""margin-bottom:unset;min-height:256px;"">
                            <div class=""card-body px-0"" style=""padding:unset !important"">
                                <div class=""border mb-3 rounded"">
                                    <div class=""justify-content-between p-2 card-title-bg"">
                                        <h5 cl");
            WriteLiteral(@"ass=""m-0"">Danh sách cán bộ phê duyệt</h5>
                                    </div>
                                    <div class=""scrollable"" style=""height:270px"">
                                        <div class=""table-responsive"">
                                            <table class=""table table-bordered"">
                                                <thead class=""font-weight-bold"">
                                                    <tr class=""text-center uppercase"">
                                                        <th style=""width:50px"">Chọn</th>
                                                        <th>Tên cán bộ</th>
                                                        <th>Đơn vị</th>
                                                    </tr>
                                                </thead>
                                                <tbody id=""modalXinYKienThemNhomDSCanBo"">
                                                </tbody>
                        ");
            WriteLiteral(@"                    </table>
                                        </div>
                                    </div>
                                    <div id=""modalXinYKienThemNhomDSCanBo_pagination""></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class=""row"" id=""divModalXinYKienThemNhomTenNhom"">
                    <div class=""col-sm-12"">
                        <form name=""frmXinYKienThemNhomTenNhom"" id=""frmXinYKienThemNhomTenNhom"" method=""post"">
                            <div class=""row"">
                                <div class=""col-sm-6"">
                                    <div class=""form-group"">
                                        <label class=""_required"">Tên nhóm</label>
                                        <input type=""text"" name=""ten_nhom"" id=""modalXinYKienThemNhomTenNhom"" required placeholder=""Nhập tên nhóm trình"" autocomplete=""off"" ");
            WriteLiteral(@"class=""form-control"">
                                    </div>
                                </div>
                                <div class=""col-sm-3"">
                                    <div class=""form-group"">
                                        <label class=""_required"">Loại trình</label>
                                        <select class=""select2 form-control custom-select"" id=""modalXinYKienLoaiTrinh"" required name=""loai_trinh"" style=""width: 100%; height:36px;"">
                                            <option");
            BeginWriteAttribute("value", " value=\"", 5663, "\"", 5671, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn loại trình</option>
                                            <option value=""BBGD"">Biên bản giám định</option>
                                            <option value=""DUYETBT"">Duyệt phương án</option>
                                            <option value=""PABT"">Phương án bồi thường</option>
                                            <option value=""TCBT"">Từ chối bồi thường</option>
                                        </select>
                                    </div>
                                </div>
                                <div class=""col-sm-3"">
                                    <div class=""form-group"">
                                        <label class=""_required"">Nghiệp vụ</label>
                                        <select class=""select2 form-control custom-select"" required name=""nghiep_vu"" style=""width: 100%; height:36px;"">
                                            <option");
            BeginWriteAttribute("value", " value=\"", 6618, "\"", 6626, 0);
            EndWriteAttribute();
            WriteLiteral(@">Chọn nghiệp vụ</option>
                                            <option value=""XE"">Xe ô tô</option>
                                            <option value=""XE_MAY"">Xe máy</option>
                                            <option value=""NG"">Con người</option>
                                        </select>
                                    </div>
                                </div>
                            </div> 
                        </form>
                    </div>
                </div>
            </div>
            <div class=""modal-footer"">
");
            WriteLiteral("                <button type=\"button\" class=\"btn btn-primary btn-sm wd-90 mg-t-22\" id=\"ModalXinYKien_btnLuuThemNhom\">\r\n                    <i class=\"fas fa-save mr-2\"></i>Lưu\r\n                </button>\r\n");
            WriteLiteral(@"                <button type=""button"" class=""btn btn-primary btn-sm wd-90 mg-t-22"" data-dismiss=""modal"">
                    <i class=""fas fa-window-close mr-2""></i>Đóng
                </button>
            </div>
        </div>
    </div>
</div>

<div id=""modalXinYKienChonDonVi"" class=""modal-drag"" style=""width:400px; z-index:9999999;"">
    <div class=""modal-drag-header border-bottom"">
        <h5><span class=""modal-drag-title"">Chọn đơn vị</span> <span data-dismiss=""modal-drag""><i class=""fa fa-times""></i></span></h5>
    </div>
    <div class=""modal-drag-content"" style=""padding-top:5px;"">
        <div class=""row"">
            <div class=""col-12"">
                <input type=""text"" id=""modalXinYKienChonDonViTimKiem"" onclick=""onFocus(this)"" autocomplete=""off"" placeholder=""Tìm kiếm thông tin"" class=""form-control"">
            </div>
            <div class=""col-12 mt-2 scrollable"" style=""max-height:250px;"" id=""modalXinYKienChonDonViDanhSach""></div>
        </div>
    </div>
    <div class=""mo");
            WriteLiteral(@"dal-drag-footer"" style=""border-top: 1px solid #e9ecef;"">
        <button type=""button"" class=""btn btn-primary btn-sm wd-85"" id=""ModalXinYKien_btnChonDonVi"">
            <i class=""fas fa-mouse-pointer mr-2""></i> Chọn
        </button>
    </div>
</div>

<script type=""text/html"" id=""ModalXinYKienGridTemplate"">
    <% if(ds_nsd.length > 0){
    var stt = 1;
    _.forEach(ds_nsd, function(item,index) { %>
    <tr class=""divItemDsNguoiDuyet"" data-id=""<%- item.nsd_duyet.trim().replace(/[^a-zA-Z0-9]/g, '') %>"" style=""cursor:pointer"">
        <td class=""text-center"" onclick=""onModalXinYKienGridXemCTNoiDung('<%- item.ma_chi_nhanh_duyet %>','<%- item.nsd_duyet %>')"">
            <%- stt %>
        </td>
        <td onclick=""onModalXinYKienGridXemCTNoiDung('<%- item.ma_chi_nhanh_duyet %>','<%- item.nsd_duyet %>')"">
            <a class=""combobox"" data-field=""ten_nsd_duyet"" data-val=""<%- item.ten_nsd_duyet %>"">
                <%- item.ten_nsd_duyet %>
            </a>
        </td>
        <td class=");
            WriteLiteral(@"""text-center"" onclick=""onModalXinYKienGridXemCTNoiDung('<%- item.ma_chi_nhanh_duyet %>','<%- item.nsd_duyet %>')"">
            <a class=""combobox"" data-field=""nsd_duyet"" data-val=""<%- item.nsd_duyet %>"">
                <%- item.nsd_duyet %>
            </a>
        </td>
        <td class=""text-center"" onclick=""onModalXinYKienGridXemCTNoiDung('<%- item.ma_chi_nhanh_duyet %>','<%- item.nsd_duyet %>')"">
            <a data-field=""trang_thai_y_kien"" data-val=""""><i class=""fas fa-check""></i></a>
        </td>
        <td class=""text-center"" onclick=""onModalXinYKienGridXemCTNoiDung('<%- item.ma_chi_nhanh_duyet %>','<%- item.nsd_duyet %>')"">
            <a class=""combobox d-none"" data-field=""ten_cnhanh_duyet"" data-val=""<%- item.ten_cnhanh_duyet %>""></a>
            <a class=""combobox"" data-field=""ma_chi_nhanh_duyet"" data-val=""<%- item.ma_chi_nhanh_duyet %>"">
                <%- item.ten_cnhanh_duyet %>
            </a>
        </td>
        <td class=""text-center"">
            <a href=""#"" onclick=""on");
            WriteLiteral("ModalXinYKienGridXoaNsd(\'<%- item.ma_chi_nhanh_duyet %>\',\'<%- item.nsd_duyet %>\')\" class=\"text-danger\"><i class=\"fa fa-times\"></i></a>\r\n        </td>\r\n    </tr>\r\n    <% stt++ %>\r\n    <% })} %>\r\n    <% if(ds_nsd.length < 4){\r\n    for(var");
            BeginWriteAttribute("i", " i =", 11205, "", 11209, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 4 - ds_nsd.length;i++ ){
    %>
    <tr>
        <td style=""height:38.2px;""></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <% }} %>
</script>

<script type=""text/html"" id=""ModalXinYKienGridLichSuTemplate"">
    <% if(lich_su.length > 0){
    var stt = 1;
    _.forEach(lich_su, function(item,index) { %>
    <tr>
        <td class=""text-center""><%- stt %></td>
        <td class=""text-center"" style=""font-weight:bold""><%- item.nhom_ten %></td>
        <td><%- item.ten_nsd_cho_yk %></td>
        <td><%- item.ten_cnhanh_cho_yk %></td>
        <td class=""text-center""><%- item.ngay_cho_yk %></td>
        <td><%- item.nd_cho_y_kien %></td>
    </tr>
    <% stt++ %>
    <% })}%>
    <% if(lich_su.length < 3){
    for(var");
            BeginWriteAttribute("i", " i =", 12027, "", 12031, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 3 - lich_su.length;i++ ){
    %>
    <tr>
        <td style=""height:38.2px;""></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <% }} %>
</script>

<script type=""text/html"" id=""modalXinYKienThemNhomDSCanBoTemplate"">
    <% _.forEach(danh_sach, function(item, index) { %>
    <tr class=""divItemDsCanBoTrinh"" data-nhom-chi-nhanh=""<%- item.ma_chi_nhanh %>"" data-ma-cb=""<%- item.ma %>"" data-text=""<%- item.ma+item.ten.toLowerCase() %>"">
        <td style=""width:30px; padding:0;"">
            <div style=""width:16px; margin:0 auto"">
                <input type=""hidden"" data-field=""ma_doi_tac_duyet"" data-val=""<%- item.ma_doi_tac %>"" class=""form-control"" />
                <input type=""hidden"" data-field=""ma_chi_nhanh_duyet"" data-val=""<%- item.ma_chi_nhanh %>"" class=""form-control"" />
                <%");
            BeginWriteAttribute("if(item.chon", " if(item.chon =", 12919, "", 12934, 0);
            EndWriteAttribute();
            WriteLiteral(@"=0){
                %>
                <input type=""checkbox"" onchange=""onModalXinYKienChonCanBo(this)"" data-field=""nsd_duyet"" data-val=""<%- item.ma %>"" class=""form-control chon-can-bo"" />
                <%}else{%>
                <input type=""checkbox"" checked=""checked"" onchange=""onModalXinYKienChonCanBo(this)"" data-field=""nsd_duyet"" data-val=""<%- item.ma %>"" class=""form-control chon-can-bo"" />
                <%}%>

            </div>
        </td>
        <td style=""padding: 7px 10px""><%- item.ten %> (<%- item.ma %>)</td>
        <td style=""padding: 7px 10px"" class=""text-center""><%- item.ten_chi_nhanh %></td>
    </tr>
    <%})%>

    <% if(danh_sach.length < 7){
    for(var");
            BeginWriteAttribute("i", " i =", 13637, "", 13641, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 7 - danh_sach.length;i++ ){ %>
    <tr style=""cursor: pointer"">
        <td style=""height:33.1px""></td>
        <td></td>
        <td></td>
    </tr>
    <%}}%>
</script>

<script type=""text/html"" id=""modalXinYKienChonDonViDanhSachTemplate"">
    <% if(danh_sach.length > 0){
    _.forEach(danh_sach, function(item,index) { %>
    <div class=""custom-control custom-checkbox modalXinYKienChonDonViDanhSachItem"" data-text=""<%- item.ten_tat.toLowerCase() %>"">
        <input type=""checkbox"" id=""dvi_duyet_<%- item.ma %>"" value=""<%- item.ma %>"" class=""custom-control-input modalChonDviDuyet"">
        <label class=""custom-control-label"" style=""cursor:pointer;"" for=""dvi_duyet_<%- item.ma %>""><%- item.ten_tat %></label>
    </div>
    <% })}else{ %>
    <div class=""text-center"" style=""width:100%"">Chưa có dữ liệu</div>
    <% } %>
</script>

<script type=""text/html"" id=""tblDsLanYKienBodyTemplate"">
    <% if(data.length > 0){
    _.forEach(data, function(item,index) { %>
    <tr style=""cursor: ");
            WriteLiteral(@"pointer; text-align:center"" id=""so_id_yk_<%- item.so_id_yk %>"" onclick=""getDetailYKienTheoLan('<%- item.so_id_yk %>')"" class=""item-lan-yk"">
        <td style=""font-weight:bold"">
            <input type=""hidden"" data-field=""so_id_yk"" value=""<%- item.so_id_yk %>"" />
            <a class=""combobox"" data-field=""thoi_gian_y_kien"" data-val=""<%- item.thoi_gian_y_kien %>"">
                <%- item.thoi_gian_y_kien %>
            </a>
        </td>
    </tr>
    <%})} %>
    <% if(data.length < 10){
    for(var");
            BeginWriteAttribute("i", " i =", 15182, "", 15186, 0);
            EndWriteAttribute();
            WriteLiteral(" 0; i < 10 - data.length;i++ ){\r\n    %>\r\n    <tr>\r\n        <td style=\"height:38.2px;\"></td>\r\n    </tr>\r\n    <% }} %>\r\n</script>\r\n");
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