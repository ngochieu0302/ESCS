#pragma checksum "D:\ESCS\ESCS\Areas\HealthClaim\Views\_ModalXemThongTinQuyenLoiLSTT.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "c12e7b27c9a03ef236828da1eaddbc70ffa6b1b7"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Areas_HealthClaim_Views__ModalXemThongTinQuyenLoiLSTT), @"mvc.1.0.view", @"/Areas/HealthClaim/Views/_ModalXemThongTinQuyenLoiLSTT.cshtml")]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"c12e7b27c9a03ef236828da1eaddbc70ffa6b1b7", @"/Areas/HealthClaim/Views/_ModalXemThongTinQuyenLoiLSTT.cshtml")]
    public class Areas_HealthClaim_Views__ModalXemThongTinQuyenLoiLSTT : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            WriteLiteral(@"<div class=""modal fade show"" id=""modalXemThongTinQuyenLoiLSTT"" tabindex=""-1"" data-backdrop=""static"" data-keyboard=""false"" role=""dialog"" aria-labelledby=""myLargeModalLabel"">
    <div class=""modal-dialog"" role=""document"" style=""max-width: 95vw"">
        <div class=""modal-content"">
            <div class=""modal-header py-1"">
                <h4 class=""modal-title"" id=""titleXemThongTinQuyenLoiLSTT"">Thông tin quyền lợi bảo hiểm</h4>
                <button type=""button"" class=""close"" data-dismiss=""modal"" aria-hidden=""true"">×</button>
            </div>
            <div class=""modal-body px-2 py-0"">
                <div class=""row"">
                    <div class=""col-12"">
                        <div class=""card"" style=""margin-bottom:0px; min-height:600px"">
                            <div class=""card mb-0"">
                                <div class=""card-body"" style=""padding:0px"">
                                    <div class=""row"">
                                        <div class=""col-12"" id=""n");
            WriteLiteral(@"avThongTinQuyenLoiLSTT"">
                                            <ul class=""nav nav-pills mt-2"" role=""tablist"" style=""background-color:#f8f9fa"">
                                                <li class=""nav-item"" style=""font-weight:bold"">
                                                    <a class=""nav-link active"" href=""#tabQuyenLoiBaoHiem"" data-toggle=""tab"" role=""tab"" aria-controls=""home"" aria-selected=""true"">
                                                        <i class=""far fa-file-search mr-2""></i> Quyền lợi bảo hiểm
                                                    </a>
                                                </li>
                                                <li class=""nav-item"" style=""font-weight:bold"">
                                                    <a class=""nav-link"" href=""#tabLichSuBoiThuong"" data-toggle=""tab"" role=""tab"" aria-controls=""profile"" aria-selected=""false"">
                                                        <i class=""fas fa-history mr-2""></i> Lịch ");
            WriteLiteral(@"sử tổn thất
                                                    </a>
                                                </li>
                                            </ul>
                                            <div class=""tab-content"">
                                                <div class=""tab-pane px-0"" id=""tabQuyenLoiBaoHiem"" role=""tabpanel"">
                                                    <div class=""table-responsive"" style=""max-height:70vh"">
                                                        <table class=""table table-bordered"" style=""border-collapse: separate; border-spacing: 0;"">
                                                            <thead class=""font-weight-bold card-title-bg-primary"" style=""position: sticky; top: 0;"">
                                                                <tr>
                                                                    <th rowspan=""2"" style=""text-align:center; width:400px; vertical-align:middle;"">Tên Quyền lợi bảo hiểm</th>
       ");
            WriteLiteral(@"                                                             <th colspan=""5"" style=""text-align:center"">Quyền lợi bảo hiểm gốc</th>
                                                                    <th colspan=""2"" style=""text-align:center"">Quyền lợi đã sử dụng</th>
                                                                    <th colspan=""2"" style=""text-align:center"">Quyền lợi còn lại</th>
                                                                </tr>
                                                                <tr class=""text-center uppercase"">
                                                                    <th>Số lần(ngày)/năm</th>
                                                                    <th>Số tiền giới hạn(ngày)/năm</th>
                                                                    <th>Quyền lợi/năm</th>
                                                                    <th>Tỷ lệ đồng</th>
                                                                    <");
            WriteLiteral(@"th>Số ngày chờ</th>
                                                                    <th>Số lần(ngày)</th>
                                                                    <th>Quyền lợi/năm</th>
                                                                    <th>Số lần(ngày)</th>
                                                                    <th>Quyền lợi/năm</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id=""tblDanhSachQuyenLoiGoc"">
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                                <div class=""tab-pane px-0"" id=""tabLichSuBoiThuong"" role=""tabpanel"">
                              ");
            WriteLiteral(@"                      <div class=""table-responsive"" style=""max-height:70vh"">
                                                        <table style=""width:180%;"" class=""table table-bordered fixed-header"">
                                                            <thead class=""text-center font-weight-bold"">
                                                                <tr class=""text-center uppercase"">
                                                                    <th>Ngày mở</th>
                                                                    <th>Số hồ sơ</th>
                                                                    <th>Loại</th>
                                                                    <th>Ngày vv</th>
                                                                    <th>Ngày rv</th>
                                                                    <th>Hình thức điều trị</th>
                                                                    <th>Nguyên nhân</th>");
            WriteLiteral(@"
                                                                    <th>Quyền lợi</th>
                                                                    <th>Cơ sở y tế</th>
                                                                    <th style=""width: 20%;"">Chẩn đoán</th>
                                                                    <th>Tiền yêu cầu</th>
                                                                    <th>Tiền duyệt</th>
                                                                    <th>Trạng thái</th>
                                                                    <th>Ghi chú</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody id=""tblDanhSachLichSuBoiThuong"">
                                                            </tbody>
                                                        </table>
    ");
            WriteLiteral(@"                                                </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class=""col-12 py-2"">
                        <button type=""button"" class=""btn btn-primary btn-sm wd-90 float-right"" data-dismiss=""modal"">
                            <i class=""fas fa-window-close mr-2""></i>Đóng
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script type=""text/html"" id=""tblDanhSachLichSuBoiThuongTemplate"">
    <% if(arrHoSo.length > 0){ %>
    <% _.forEach(arrHoSo, function(item,index) { %>
    <tr class=""text-center"">
        <td><%- item.ngay_ht %></td>
        <td><%- item.so_h");
            WriteLiteral(@"s %></td>
        <td><%= item.loai_ten%></td>
        <td><%- item.ngay_vv %></td>
        <td><%- item.ngay_rv %></td>
        <td><%- item.hinh_thuc_ten %></td>
        <td><%- item.ten_nguyen_nhan %></td>
        <td><%- item.quyen_loi_ten %></td>

        <td class=""text-left""><%- item.ten_benh_vien %></td>
        <td class=""text-left""><%- item.chan_doan %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_yc) %></td>
        <td class=""text-right""><%- ESUtil.formatMoney(item.so_tien_duyet) %></td>
        <td class=""text-center""><%- item.trang_thai %></td>
        <td class=""text-center"">
            <% if(item.ghi_chu");
            BeginWriteAttribute("!", " !=", 8861, "", 8864, 0);
            EndWriteAttribute();
            WriteLiteral(" null && item.ghi_chu");
            BeginWriteAttribute("!", " != \'", 8885, "\'", 8890, 0);
            EndWriteAttribute();
            WriteLiteral(" && item.ghi_chu");
            BeginWriteAttribute("!", " !=", 8907, "", 8910, 0);
            EndWriteAttribute();
            WriteLiteral(@" undefined){ %>
            <a href=""#"" data-field=""ghi_chu"" data-val=""<%- item.ghi_chu %>"" onclick=""showGhiChuLSTT(this)"" class=""cursor-pointer combobox"">
                <i class=""far fa-file-alt"" title=""Ghi chú""></i>
            </a>
            <% }else{ %>
            <a data-field=""ghi_chu"" data-val="""" onclick=""showGhiChuLSTT(this)"" class=""cursor-pointer combobox"">
                <i class=""far fa-file-alt"" title=""Ghi chú""></i>
            </a>
            <% } %>
        </td>
    </tr>
    <% })}%>

    <% if(arrHoSo.length < 13){
    for(var");
            BeginWriteAttribute("i", " i =", 9480, "", 9484, 0);
            EndWriteAttribute();
            WriteLiteral(@" 0; i < 13 - arrHoSo.length;i++ ){
    %>
    <tr>
        <td style=""height:35px;""></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td></td>
    </tr>
    <% }} %>
</script>

<script type=""text/html"" id=""tblDanhSachQuyenLoiGocTemplate"">
    <% _.forEach(lstQlg, function(item, index) { %>
    <% var");
            BeginWriteAttribute("thu_tu_cha_con", " thu_tu_cha_con =", 9989, "", 10006, 0);
            EndWriteAttribute();
            WriteLiteral(" item.lh_nv.split(\'.\').length - 1 %>\r\n    <%");
            BeginWriteAttribute("if(thu_tu_cha_con", " if(thu_tu_cha_con =", 10050, "", 10070, 0);
            EndWriteAttribute();
            WriteLiteral(@"= 0){ %>
    <tr>
        <td style=""font-weight: bold"">
            <%= item.ten_hien_thi %>
        </td>
        <td style=""font-weight: bold"" class=""text-center""><%- item.so_lan_ngay %></td>
        <td style=""font-weight: bold"" class=""text-right""><%- ESUtil.formatMoney(item.tien_lan_ngay) %></td>
        <td style=""font-weight: bold"" class=""text-right""><%- ESUtil.formatMoney(item.tien_nam) %></td>
        <td style=""font-weight: bold"" class=""text-center""><%- item.dong_bh %> % </td>
        <td style=""font-weight: bold"" class=""text-center""><%- item.so_ngay_cho %></td>
        <td style=""font-weight: bold"" class=""text-center""><%- item.so_lan_ngay_duyet %></td>
        <td style=""font-weight: bold"" class=""text-right""><%- ESUtil.formatMoney(item.tien_nam_duyet) %></td>
        <td style=""font-weight: bold"" class=""text-center""><%- item.so_lan_ngay_con %></td>
        <td style=""font-weight: bold"" class=""text-right""><%- ESUtil.formatMoney(item.tien_nam_con) %></td>
    </tr>
    <% } else{ %>
 ");
            WriteLiteral("   <% var");
            BeginWriteAttribute("pd", " pd =", 11103, "", 11108, 0);
            EndWriteAttribute();
            WriteLiteral(@" thu_tu_cha_con * 15 %>
    <tr>
        <td style=""font-style: italic; padding-left: <%- pd %>px"">
            <%= item.ten_hien_thi %>
        </td>
        <td style=""font-style: italic;"" class=""text-center""><%- item.so_lan_ngay %></td>
        <td style=""font-style: italic;"" class=""text-right""><%- ESUtil.formatMoney(item.tien_lan_ngay) %></td>
        <td style=""font-style: italic;"" class=""text-right""><%- ESUtil.formatMoney(item.tien_nam) %></td>
        <td style=""font-style: italic;"" class=""text-center""><%- item.dong_bh %> % </td>
        <td style=""font-style: italic;"" class=""text-center""><%- item.so_ngay_cho %></td>
        <td style=""font-style: italic;"" class=""text-center""><%- item.so_lan_ngay_duyet %></td>
        <td style=""font-style: italic;"" class=""text-right""><%- ESUtil.formatMoney(item.tien_nam_duyet) %></td>
        <td style=""font-style: italic;"" class=""text-center""><%- item.so_lan_ngay_con %></td>
        <td style=""font-style: italic;"" class=""text-right""><%- ESUtil.formatMone");
            WriteLiteral("y(item.tien_nam_con) %></td>\r\n    </tr>\r\n    <% } %>\r\n    <%})%>\r\n</script>\r\n\r\n\r\n\r\n");
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
