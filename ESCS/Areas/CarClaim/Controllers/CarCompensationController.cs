using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ESCS.Models;
using System.Xml;
using System.IO;
using System.Xml.Serialization;
using System.Security.Cryptography.X509Certificates;
using ClosedXML.Excel;
using Microsoft.AspNetCore.Hosting;
using Newtonsoft.Json;
using ESCS.Common;
using ESCS.COMMON.Response;
using ESCS.MODEL.ESCS.OutValues;
using ESCS.COMMON.Http;
using ESCS.COMMON.Auth;
using ESCS.COMMON.Request;
using System.Net.Http;
using System.Net.Http.Headers;
using ESCS.COMMON.Common;
using System.Text;
using ESCS.MODEL.ESCS.ModelView;
using ESCS.MODEL.ESCS;
using ESCS.COMMON.OCR;
using System.Drawing;
using ESCS.COMMON.EscsBill;
using ESCS.COMMON.Contants;
using System.Web;

namespace ESCS.Areas.CarClaim.Controllers
{
    [Area("CarClaim")]
    [SystemAuthen]
    public class CarCompensationController : BaseController
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        public CarCompensationController(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }
        public IActionResult Index(string ho_so)
        {
            ViewBag.ho_so = Utilities.DecryptByKey(ho_so, AppSettings.KeyEryptData);
            return View();
        }
        /// <summary>
        /// Lấy tất cả danh mục màn hình tính toán bồi thường xe cơ giới
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_DMUC, json);
            return Ok(data);
        }
        /// <summary>
        /// Danh sách hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> paging()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PBH_BT_XE_HS_LKE, (object)rq);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin chi tiết 1 hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinChiTietHoSo()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PBH_BT_XE_HS_LKE_CT, (object)rq);
            return Ok(data);
        }

        /// <summary>
        /// BTV nhận hồ sơ 
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhanHoSoBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NHAN_HS, json);
            return Ok(data);
        }
        /// <summary>
        /// tra nhận hồ sơ 
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> traHoSoBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_CHUYEN_BT_HUY, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu hạng mục tổn thất của 1 hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuHangMucTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_PHAN_HANG_PHU_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa hạng mục tổn thất của 1 hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaHangMucTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_PHAN_HANG_PHU_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Xem chi tiết nghiệp vụ của 1 hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemNghiepVu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Thêm gara báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> themGaraBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_THEM, json);
            return Ok(data);
        }
        /// <summary>
        /// Chọn gara hợp tác báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chonGaraHopTacBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_NHIEU, json);
            return Ok(data);
        }
        /// <summary>
        /// Đọc hóa đơn
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> docHoaDon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_DOC_EBILL_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy tất cả gara báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layGaraBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách gara hợp tác
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layGaraHopTac()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_GIA_GARA_HOP_TAC, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy gara báo giá chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layGaraBaoGiaCT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Download mẫu báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> downloadMauBaoGia(bao_gia baoGia)
        {
            //Kiểm tra xem số id và mã gara đã truyền lên hay chưa?
            var nsd = GetUser();
            baoGia.ma_doi_tac_nsd = nsd.ma_doi_tac;
            baoGia.ma_chi_nhanh_nsd = nsd.ma_chi_nhanh;
            baoGia.nsd = nsd.nsd;
            baoGia.pas = nsd.pas;
            var json = JsonConvert.SerializeObject(baoGia);
            var data = await Request.GetResponeNew<IEnumerable<bao_gia_chi_tiet>>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_DOWNLOAD, json);
            if (data.state_info.status != "OK")
            {
                data.state_info.message_code = "400";
                return Ok(data);
            }
            string fileName = "template_export_bao_gia.xlsx";
            var filename_output = Path.Combine(_webHostEnvironment.ContentRootPath, "App_Data", fileName);
            using (XLWorkbook workbook = new XLWorkbook(filename_output))
            {
                var ws = workbook.Worksheet(1);
                int rowIndex = 4;
                foreach (var rowData in data.data_info)
                {
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.HANG_MUC).SetValue(rowData.ten_hang_muc);
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.HANG_MUC).Comment.AddText(rowData.hang_muc ?? "");
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.HANG_MUC).Style.Fill.BackgroundColor = XLColor.LightGray;
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.MUC_DO).SetValue(rowData.muc_do_ten);
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.MUC_DO).Comment.AddText(rowData.muc_do ?? "");
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.MUC_DO).Style.Fill.BackgroundColor = XLColor.LightGray;
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.THAY_THE_SC).SetValue(rowData.thay_the_sc_hthi);
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.THAY_THE_SC).Comment.AddText(rowData.thay_the_sc ?? "");
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.THAY_THE_SC).Style.Fill.BackgroundColor = XLColor.LightGray;

                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.SO_LUONG).SetValue(rowData.so_luong);
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.TIEN_VAT_TU).SetValue(rowData.tien_vtu);
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.TIEN_NHAN_CONG).SetValue(rowData.tien_nhan_cong);
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.TIEN_KHAC).SetValue(rowData.tien_khac);
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.TONG_CONG).SetValue(rowData.tong_cong);
                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.TONG_CONG).Style.Fill.BackgroundColor = XLColor.LightGray;

                    ws.Cell(rowIndex, (int)EXPORT_BAO_GIA_CHI_TIET_ENUM.GHI_CHU).SetValue(rowData.ghi_chu);
                    string AdjustedPriceFormula = "=E" + rowIndex + "+" + "G" + rowIndex + "+" + "G" + rowIndex;
                    ws.Cells("H" + rowIndex).FormulaA1 = AdjustedPriceFormula;
                    rowIndex++;
                }
                var workbookBytes = new byte[0];
                using (var ms = new MemoryStream())
                {
                    workbook.SaveAs(ms);
                    workbookBytes = ms.ToArray();
                    return Ok(workbookBytes);
                }
            }
        }
        /// <summary>
        /// Download mẫu báo giá dọc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public IActionResult downloadMauBaoGiaDoc(bao_gia baoGia)
        {
            string fileName = "template_export_bao_gia_tong_hop.xlsx";
            var filename_output = Path.Combine(_webHostEnvironment.ContentRootPath, "App_Data", fileName);
            var arr = Utilities.FileToByteArray(filename_output);
            return Ok(arr);
        }
        /// <summary>
        /// Upload báo giá
        /// </summary>
        /// <param name="baoGia"></param>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> uploadBaoGia(bao_gia baoGia)
        {
            BaseResponse<IEnumerable<bao_gia_chi_tiet>> res = new BaseResponse<IEnumerable<bao_gia_chi_tiet>>();
            if (baoGia == null || baoGia.file_upload_bao_gia == null || baoGia.file_upload_bao_gia.Length <= 0)
            {
                res.state_info.status = "500";
                res.state_info.message_body = "Không tìm thấy file upload";
                return Ok(res);
            }
            string extension = Path.GetExtension(baoGia.file_upload_bao_gia.FileName).ToLower();
            if (extension != ".xlsx" && extension != ".xls")
            {
                res.state_info.status = "500";
                res.state_info.message_body = "Không đúng định dạng file";
                return Ok(res);
            }
            var nsd = GetUser();
            baoGia.ma_doi_tac_nsd = nsd.ma_doi_tac;
            baoGia.ma_chi_nhanh_nsd = nsd.ma_chi_nhanh;
            baoGia.nsd = nsd.nsd;
            baoGia.pas = nsd.pas;
            var json = JsonConvert.SerializeObject(baoGia);
            var data = await Request.GetResponeNew<List<bao_gia_chi_tiet>>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_DOWNLOAD, json);
            using (XLWorkbook workbook = new XLWorkbook(baoGia.file_upload_bao_gia.OpenReadStream()))
            {
                var ws = workbook.Worksheet(1);
                var rows = ws.RangeUsed().RowsUsed().Skip(3);
                foreach (var row in rows)
                {
                    var cellHangMuc = row.Cell((int)EXPORT_BAO_GIA_CHI_TIET_ENUM.HANG_MUC);
                    var hang_muc = cellHangMuc.Comment?.Text?.Trim();

                    var ten_hang_muc = row.Cell((int)EXPORT_BAO_GIA_CHI_TIET_ENUM.HANG_MUC).GetString();
                    var muc_do_ten = row.Cell((int)EXPORT_BAO_GIA_CHI_TIET_ENUM.MUC_DO).GetString();
                    var thay_the_sc_ten = row.Cell((int)EXPORT_BAO_GIA_CHI_TIET_ENUM.THAY_THE_SC).GetString();
                    var so_luong = row.Cell((int)EXPORT_BAO_GIA_CHI_TIET_ENUM.SO_LUONG).GetString();
                    var tien_vtu = row.Cell((int)EXPORT_BAO_GIA_CHI_TIET_ENUM.TIEN_VAT_TU).GetString();
                    var tien_nhan_cong = row.Cell((int)EXPORT_BAO_GIA_CHI_TIET_ENUM.TIEN_NHAN_CONG).GetString();
                    var tien_khac = row.Cell((int)EXPORT_BAO_GIA_CHI_TIET_ENUM.TIEN_KHAC).GetString();
                    var tong_cong = row.Cell((int)EXPORT_BAO_GIA_CHI_TIET_ENUM.TONG_CONG).GetString();
                    var ghi_chu = row.Cell((int)EXPORT_BAO_GIA_CHI_TIET_ENUM.GHI_CHU).GetString();

                    var so_luong_num = string.IsNullOrEmpty(so_luong.Trim()) || !decimal.TryParse(so_luong.Trim(), out _) ? 0 : Convert.ToDecimal(so_luong.Trim());
                    var tien_vtu_num = string.IsNullOrEmpty(tien_vtu.Trim()) || !decimal.TryParse(tien_vtu.Trim(), out _) ? 0 : Convert.ToDecimal(tien_vtu.Trim());
                    var tien_nhan_cong_num = string.IsNullOrEmpty(tien_nhan_cong.Trim()) || !decimal.TryParse(tien_nhan_cong.Trim(), out _) ? 0 : Convert.ToDecimal(tien_nhan_cong.Trim());
                    var tien_khac_num = string.IsNullOrEmpty(tien_khac.Trim()) || !decimal.TryParse(tien_khac.Trim(), out _) ? 0 : Convert.ToDecimal(tien_khac.Trim());
                    if (so_luong_num < 0)
                    {
                        so_luong_num = 0;
                        tien_vtu_num = 0;
                    }
                    if (tien_vtu_num < 0)
                        tien_vtu_num = 0;
                    if (tien_nhan_cong_num < 0)
                        tien_nhan_cong_num = 0;
                    if (tien_khac_num < 0)
                        tien_khac_num = 0;

                    var tong_cong_num = tien_vtu_num + tien_nhan_cong_num + tien_khac_num;
                    var dataSet = data.data_info?.Where(n => n.hang_muc == hang_muc);
                    if (dataSet != null && dataSet.Count() > 0)
                    {
                        foreach (var hm in dataSet)
                        {
                            hm.tien_vtu = tien_vtu_num;
                            hm.tien_nhan_cong = tien_nhan_cong_num;
                            hm.tien_khac = tien_khac_num;
                            hm.tong_cong = tong_cong_num;

                            hm.tien_vtu_dx = tien_vtu_num;
                            hm.tien_nhan_cong_dx = tien_nhan_cong_num;
                            hm.tien_khac_dx = tien_khac_num;
                            hm.tien_dx = tong_cong_num;

                            hm.tien_vtu_duyet = hm.tien_vtu_dx;
                            hm.tien_nhan_cong_duyet = hm.tien_nhan_cong_dx;
                            hm.tien_khac_duyet = hm.tien_khac_dx;
                            hm.tien_duyet = hm.tien_dx;
                            hm.ghi_chu = ghi_chu;
                        }
                    }
                    else
                    {
                        bao_gia_chi_tiet hm_gara = new bao_gia_chi_tiet();
                        hm_gara.hang_muc = Guid.NewGuid().ToString("N");
                        hm_gara.ten_hang_muc = ten_hang_muc;
                        hm_gara.muc_do_ten = muc_do_ten;
                        hm_gara.thay_the_sc_ten = thay_the_sc_ten;

                        hm_gara.tien_vtu = tien_vtu_num;
                        hm_gara.tien_nhan_cong = tien_nhan_cong_num;
                        hm_gara.tien_khac = tien_khac_num;
                        hm_gara.tong_cong = tong_cong_num;

                        hm_gara.tien_vtu_dx = tien_vtu_num;
                        hm_gara.tien_nhan_cong_dx = tien_nhan_cong_num;
                        hm_gara.tien_khac_dx = tien_khac_num;
                        hm_gara.tien_dx = tong_cong_num;

                        hm_gara.tien_vtu_duyet = tien_vtu_num;
                        hm_gara.tien_nhan_cong_duyet = tien_nhan_cong_num;
                        hm_gara.tien_khac_duyet = tien_khac_num;
                        hm_gara.tien_duyet = tong_cong_num;

                        hm_gara.ghi_chu = ghi_chu;
                        hm_gara.loai_hang_muc = "B";
                        hm_gara.hang_muc_bo_sung_moi = "M";
                        data.data_info.Add(hm_gara);
                    }
                }
            }
            return Ok(data);
        }
        /// <summary>
        /// Upload báo giá dọc
        /// </summary>
        /// <param name="baoGia"></param>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> uploadBaoGiaDoc(bao_gia baoGia)
        {
            #region Kiểm tra file
            BaseResponse<IEnumerable<bao_gia_chi_tiet>> res = new BaseResponse<IEnumerable<bao_gia_chi_tiet>>();
            if (baoGia == null || baoGia.file_upload_bao_gia_doc == null || baoGia.file_upload_bao_gia_doc.Length <= 0)
            {
                res.state_info.status = "500";
                res.state_info.message_body = "Không tìm thấy file upload";
                return Ok(res);
            }
            string extension = Path.GetExtension(baoGia.file_upload_bao_gia_doc.FileName).ToLower();
            if (extension != ".xlsx" && extension != ".xls")
            {
                res.state_info.status = "500";
                res.state_info.message_body = "Không đúng định dạng file";
                return Ok(res);
            }
            #endregion
            #region Đọc file excel
            List<file_bao_gia> data = new List<file_bao_gia>();
            List<file_bao_gia> data_temp = new List<file_bao_gia>();
            List<file_bao_gia> data_temp_goc = new List<file_bao_gia>();

            List<file_bao_gia_vtu> tien_vtu = new List<file_bao_gia_vtu>();
            List<file_bao_gia_ncong> tien_nhan_cong = new List<file_bao_gia_ncong>();
            List<file_bao_gia_khac> tien_son = new List<file_bao_gia_khac>();
            using (XLWorkbook workbook = new XLWorkbook(baoGia.file_upload_bao_gia_doc.OpenReadStream()))
            {
                var ws = workbook.Worksheet(1);
                var rows = ws.RangeUsed().RowsUsed().Skip(2);
                var dong = 1;
                var id_vtu = 1;
                var id_nhan_cong = 1;
                var id_son = 1;
                foreach (var row in rows)
                {
                    var ten_hang_muc = row.Cell((int)ENUM_FILE_BAO_GIA.TEN_HANG_MUC).GetString();
                    var so_luong_tmp = row.Cell((int)ENUM_FILE_BAO_GIA.SO_LUONG).GetString();
                    var so_tien_tmp = row.Cell((int)ENUM_FILE_BAO_GIA.SO_TIEN).GetString();
                    double so_luong = 0;
                    decimal so_tien = 0;
                    var loai = row.Cell((int)ENUM_FILE_BAO_GIA.LOAI).GetString();
                    if (string.IsNullOrEmpty(ten_hang_muc) || ten_hang_muc.Trim() == "")
                    {
                        res.state_info.status = "500";
                        res.state_info.message_body = "Tồn tại dòng dữ liệu chưa nhập tên hạng mục (" + dong + ")";
                        return Ok(res);
                    }
                    if (string.IsNullOrEmpty(so_luong_tmp) || so_luong_tmp.Trim() == "")
                    {
                        so_luong_tmp = "0";
                    }
                    so_luong_tmp = so_luong_tmp.Replace(",", "").Replace(".", "");
                    var ktra_so_luong = double.TryParse(so_luong_tmp, out so_luong);
                    if (!ktra_so_luong)
                        so_luong = 0;

                    if (string.IsNullOrEmpty(so_tien_tmp) || so_tien_tmp.Trim() == "")
                    {
                        res.state_info.status = "500";
                        res.state_info.message_body = "Tồn tại dòng dữ liệu chưa nhập số tiền (" + dong + ")";
                        return Ok(res);
                    }
                    so_tien_tmp = so_tien_tmp.Replace(",", "").Replace(".", "");
                    var ktra_so_tien = decimal.TryParse(so_tien_tmp, out so_tien);
                    if (!ktra_so_tien)
                    {
                        res.state_info.status = "500";
                        res.state_info.message_body = "Tồn tại dòng dữ liệu số tiền không hợp lệ (" + dong + ")";
                        return Ok(res);
                    }
                    if (string.IsNullOrEmpty(loai) || loai.Trim() == "")
                    {
                        res.state_info.status = "500";
                        res.state_info.message_body = "Tồn tại dòng dữ liệu chưa loại chi phí (" + dong + ")";
                        return Ok(res);
                    }
                    loai = loai.Trim().ToUpper();
                    if (loai != "TIEN_VTU" && loai != "TIEN_NHAN_CONG" && loai != "TIEN_SON")
                    {
                        res.state_info.status = "500";
                        res.state_info.message_body = "Tồn tại dòng dữ liệu mà loại chi phí không hợp lệ (TIEN_VTU, TIEN_NHAN_CONG, TIEN_SON) (" + dong + ")";
                        return Ok(res);
                    }
                    if (loai == "TIEN_VTU")
                    {
                        tien_vtu.Add(new file_bao_gia_vtu() { id = id_vtu, ten_hang_muc = ten_hang_muc, so_luong = so_luong, so_tien = so_tien });
                        id_vtu++;
                    }
                    if (loai == "TIEN_NHAN_CONG")
                    {
                        tien_nhan_cong.Add(new file_bao_gia_ncong() { id = id_nhan_cong, ten_hang_muc = ten_hang_muc, so_luong = 0, so_tien = so_tien });
                        id_nhan_cong++;
                    }
                    if (loai == "TIEN_SON")
                    {
                        tien_son.Add(new file_bao_gia_khac() { id = id_son, ten_hang_muc = ten_hang_muc, so_luong = 0, so_tien = so_tien });
                        id_son++;
                    }
                    dong++;
                }
            }
            #endregion
            #region Chuẩn hóa dữ liệu
            while (tien_nhan_cong.Count > 0 || tien_vtu.Count > 0)
            {
                double tl_max = 0;
                int id_ncong = 0;
                int id_vtu = 0;
                foreach (var ncong in tien_nhan_cong)
                {
                    foreach (var vtu in tien_vtu)
                    {
                        var tl_khop_nhan_cong = Math.Round(TextCompare.CalculateSimilarity(ncong.ten_hang_muc, vtu.ten_hang_muc), 2);
                        if (tl_khop_nhan_cong > tl_max)
                        {
                            id_vtu = vtu.id;
                            id_ncong = ncong.id;
                            tl_max = tl_khop_nhan_cong;
                        }
                    }
                }
                if (tl_max > 0)
                {
                    var vtu_khop = tien_vtu.Where(n => n.id == id_vtu).FirstOrDefault();
                    var ncong_khop = tien_nhan_cong.Where(n => n.id == id_ncong).FirstOrDefault();
                    var obj = new file_bao_gia
                    {
                        id_khop_vtu = vtu_khop.id,
                        ten_hang_muc_vtu = vtu_khop.ten_hang_muc,
                        tien_vtu = vtu_khop.so_tien,
                        so_luong_vtu = vtu_khop.so_luong,
                        id_khop_nhan_cong = ncong_khop.id,
                        ten_hang_muc_nhan_cong = ncong_khop.ten_hang_muc,
                        tien_nhan_cong = ncong_khop.so_tien,
                        tl_khop_nhan_cong = tl_max
                    };
                    data_temp.Add(obj);
                    tien_vtu = tien_vtu.Where(n => n.id != id_vtu).ToList();
                    tien_nhan_cong = tien_nhan_cong.Where(n => n.id != id_ncong).ToList();
                }
                if (tl_max == 0)
                {
                    if (tien_vtu.Count > 0)
                    {
                        foreach (var vt in tien_vtu)
                        {
                            var obj = new file_bao_gia
                            {
                                id_khop_vtu = vt.id,
                                ten_hang_muc_vtu = vt.ten_hang_muc,
                                tien_vtu = vt.so_tien,
                                so_luong_vtu = vt.so_luong,
                                id_khop_nhan_cong = 0,
                                ten_hang_muc_nhan_cong = "",
                                tien_nhan_cong = 0,
                                tl_khop_nhan_cong = 0
                            };
                            data_temp.Add(obj);
                            tien_vtu = tien_vtu.Where(n => n.id != vt.id).ToList();
                        }
                    }

                    if (tien_nhan_cong.Count > 0)
                    {
                        foreach (var nc in tien_nhan_cong)
                        {
                            var obj = new file_bao_gia
                            {
                                id_khop_vtu = 0,
                                ten_hang_muc_vtu = "",
                                tien_vtu = 0,
                                so_luong_vtu = 0,
                                id_khop_nhan_cong = nc.id,
                                ten_hang_muc_nhan_cong = nc.ten_hang_muc,
                                tien_nhan_cong = nc.so_tien,
                                tl_khop_nhan_cong = 0
                            };
                            data_temp.Add(obj);
                            tien_nhan_cong = tien_nhan_cong.Where(n => n.id != nc.id).ToList();
                        }
                    }
                }
            }
            while (data_temp.Count > 0 || tien_son.Count > 0)
            {
                double tl_max = 0;
                int id_vtu = 0;
                int id_ncong = 0;
                int id_son = 0;
                foreach (var item in data_temp)
                {
                    foreach (var son in tien_son)
                    {
                        var tl_khop_son = Math.Round(Math.Max(TextCompare.CalculateSimilarity(item.ten_hang_muc_nhan_cong, son.ten_hang_muc), TextCompare.CalculateSimilarity(item.ten_hang_muc_vtu, son.ten_hang_muc)), 2);
                        if (tl_khop_son > tl_max)
                        {
                            id_vtu = item.id_khop_vtu;
                            id_ncong = item.id_khop_nhan_cong;
                            id_son = son.id;
                            tl_max = tl_khop_son;
                        }
                    }
                }
                if (tl_max > 0)
                {
                    var data_temp_temp = data_temp.Where(n => n.id_khop_vtu == id_vtu && n.id_khop_nhan_cong == id_ncong).FirstOrDefault();
                    var son_khop = tien_son.Where(n => n.id == id_son).FirstOrDefault();
                    var obj = new file_bao_gia
                    {
                        id_khop_vtu = data_temp_temp.id_khop_vtu,
                        ten_hang_muc_vtu = data_temp_temp.ten_hang_muc_vtu,
                        tien_vtu = data_temp_temp.tien_vtu,
                        so_luong_vtu = data_temp_temp.so_luong_vtu,
                        id_khop_nhan_cong = data_temp_temp.id_khop_nhan_cong,
                        ten_hang_muc_nhan_cong = data_temp_temp.ten_hang_muc_nhan_cong,
                        tien_nhan_cong = data_temp_temp.tien_nhan_cong,
                        id_khop_son = son_khop.id,
                        ten_hang_muc_son = son_khop.ten_hang_muc,
                        tien_son = son_khop.so_tien,
                        tl_khop = data_temp_temp.tl_khop,
                        tl_khop_nhan_cong = data_temp_temp.tl_khop_nhan_cong,
                        tl_khop_son = tl_max
                    };
                    data.Add(obj);
                    data_temp = data_temp.Where(n => n.id_khop_vtu != id_vtu && n.id_khop_nhan_cong != id_ncong).ToList();
                    tien_son = tien_son.Where(n => n.id != id_son).ToList();
                }
                if (tl_max == 0)
                {
                    if (data_temp.Count > 0)
                    {
                        foreach (var item in data_temp)
                        {
                            var obj = new file_bao_gia
                            {
                                id_khop_vtu = item.id_khop_vtu,
                                ten_hang_muc_vtu = item.ten_hang_muc_vtu,
                                tien_vtu = item.tien_vtu,
                                so_luong_vtu = item.so_luong_vtu,
                                id_khop_nhan_cong = item.id_khop_nhan_cong,
                                ten_hang_muc_nhan_cong = item.ten_hang_muc_nhan_cong,
                                tien_nhan_cong = item.tien_nhan_cong,
                                id_khop_son = 0,
                                ten_hang_muc_son = "",
                                tien_son = 0,
                                tl_khop = item.tl_khop,
                                tl_khop_nhan_cong = item.tl_khop_nhan_cong,
                                tl_khop_son = 0
                            };
                            data.Add(obj);
                            data_temp = data_temp.Where(n => n.id_khop_vtu != item.id_khop_vtu && n.id_khop_nhan_cong != item.id_khop_nhan_cong).ToList();
                        }
                    }

                    if (tien_son.Count > 0)
                    {
                        foreach (var son in tien_son)
                        {
                            var obj = new file_bao_gia
                            {
                                id_khop_vtu = 0,
                                ten_hang_muc_vtu = "",
                                tien_vtu = 0,
                                so_luong_vtu = 0,
                                id_khop_nhan_cong = 0,
                                ten_hang_muc_nhan_cong = "",
                                tien_nhan_cong = 0,
                                id_khop_son = son.id,
                                ten_hang_muc_son = son.ten_hang_muc,
                                tien_son = son.so_tien,
                                tl_khop = 0,
                                tl_khop_son = 0
                            };
                            data.Add(obj);
                            tien_son = tien_son.Where(n => n.id != son.id).ToList();
                        }
                    }
                }
            }
            #endregion
            #region Bộ lọc dữ liệu
            foreach (var item in data)
            {
                if (!string.IsNullOrEmpty(item.ten_hang_muc_vtu))
                {
                    item.ten_hang_muc = item.ten_hang_muc_vtu;
                    item.tl_khop = 1;
                }
                else if (!string.IsNullOrEmpty(item.ten_hang_muc_nhan_cong))
                {
                    item.ten_hang_muc = item.ten_hang_muc_nhan_cong;
                }
                else if (!string.IsNullOrEmpty(item.ten_hang_muc_son))
                {
                    item.ten_hang_muc = item.ten_hang_muc_son;
                }
            }
            #endregion
            #region Mapping dữ liệu bộ mã
            var nsd = GetUser();
            baoGia.ma_doi_tac_nsd = nsd.ma_doi_tac;
            baoGia.ma_chi_nhanh_nsd = nsd.ma_chi_nhanh;
            baoGia.nsd = nsd.nsd;
            baoGia.pas = nsd.pas;
            var json = JsonConvert.SerializeObject(baoGia);
            var hang_muc_he_thong = await Request.GetResponeNew<List<ht_ma_xe_hang_muc>>(StoredProcedure.PBH_HT_MA_XE_HANG_MUC_AI, json);
            var hmHeThong = hang_muc_he_thong.data_info;
            //Chia làm 5 luồng xử lý ở đây
            var so_luong_xly = 5;
            var so_pt = (int)Math.Ceiling((decimal)data.Count / so_luong_xly);
            for (int i = 1; i <= so_luong_xly; i++)
            {
                var datatmp = data.Skip(so_pt * (i - 1)).Take(so_pt).ToList();
                var data_temp_goc1 = await Mapping(datatmp, hmHeThong);
                data_temp_goc.AddRange(data_temp_goc1);
            }

            List<file_bao_gia> tongHop = new List<file_bao_gia>();
            foreach (var item in data_temp_goc)
            {
                if (string.IsNullOrEmpty(item.ma_hang_muc_he_thong))
                    continue;
                var ds = data_temp_goc.Where(n => n.ma_hang_muc_he_thong == item.ma_hang_muc_he_thong).ToList();
                if (ds.Count() == 1)
                {
                    tongHop.AddRange(ds);
                    data_temp_goc = data_temp_goc.Where(n => n.id_khop_vtu != ds[0].id_khop_vtu).ToList();
                    hmHeThong = hmHeThong.Where(n => n.ma != item.ma_hang_muc_he_thong).ToList();
                }
            }

            while (data_temp_goc.Count > 0)
            {
                double tl_max = 0;
                int id_khop_vtu = 0;
                string ma_hm = "";
                foreach (var hmBaoGia in data_temp_goc)
                {
                    foreach (var hm in hmHeThong)
                    {
                        var tl_khop = Math.Round(TextCompare.CalculateSimilarity(hmBaoGia.ten_hang_muc, hm.ten), 2);
                        if (tl_khop > tl_max)
                        {
                            id_khop_vtu = hmBaoGia.id_khop_vtu;
                            ma_hm = hm.ma;
                            tl_max = tl_khop;
                        }
                    }
                }
                var vtu_khop = data_temp_goc.Where(n => n.id_khop_vtu == id_khop_vtu).FirstOrDefault();
                var obj = vtu_khop.Clone();
                if (tl_max > 0)
                {
                    var hangMuc = hmHeThong.Where(n => n.ma == ma_hm).FirstOrDefault();
                    if (hangMuc != null)
                    {
                        obj.ten_hang_muc_he_thong = hangMuc.ten;
                        obj.ma_hang_muc_he_thong = hangMuc.ma;
                        obj.tl_khop = tl_max;
                    }
                    tongHop.Add(obj);
                    data_temp_goc = data_temp_goc.Where(n => n.id_khop_vtu != id_khop_vtu).ToList();
                    hmHeThong = hmHeThong.Where(n => n.ma != ma_hm).ToList();
                }
                if (tl_max == 0)
                {
                    obj.ten_hang_muc_he_thong = vtu_khop.ten_hang_muc;
                    obj.ma_hang_muc_he_thong = "";
                    obj.tl_khop = 0;
                    tongHop.Add(obj);
                    data_temp_goc = data_temp_goc.Where(n => n.id_khop_vtu != id_khop_vtu).ToList();
                }
            }
            tongHop = tongHop.OrderBy(n => n.id_khop_vtu).ToList();
            #endregion
            return Ok(tongHop);
        }
        private async Task<List<file_bao_gia>> Mapping(List<file_bao_gia> data, List<ht_ma_xe_hang_muc> hmHeThong)
        {
            List<file_bao_gia> data_temp_goc = new List<file_bao_gia>();
            while (data.Count > 0)
            {
                double tl_max = 0;
                int id_khop_vtu = 0;
                string ma_hm = "";
                foreach (var hmBaoGia in data)
                {
                    foreach (var hm in hmHeThong)
                    {
                        var tl_khop = Math.Round(TextCompare.CalculateSimilarity(hmBaoGia.ten_hang_muc, hm.ten), 2);
                        if (tl_khop > tl_max)
                        {
                            id_khop_vtu = hmBaoGia.id_khop_vtu;
                            ma_hm = hm.ma;
                            tl_max = tl_khop;
                        }
                    }
                }
                var vtu_khop = data.Where(n => n.id_khop_vtu == id_khop_vtu).FirstOrDefault();
                var obj = vtu_khop.Clone();
                if (tl_max > 0)
                {
                    var hangMuc = hmHeThong.Where(n => n.ma == ma_hm).FirstOrDefault();
                    if (hangMuc != null)
                    {
                        obj.ten_hang_muc_he_thong = hangMuc.ten;
                        obj.ma_hang_muc_he_thong = hangMuc.ma;
                        obj.tl_khop = tl_max;
                    }
                    data_temp_goc.Add(obj);
                    data = data.Where(n => n.id_khop_vtu != id_khop_vtu).ToList();
                    hmHeThong = hmHeThong.Where(n => n.ma != ma_hm).ToList();
                }
                if (tl_max == 0)
                {
                    obj.ten_hang_muc_he_thong = vtu_khop.ten_hang_muc;
                    obj.ma_hang_muc_he_thong = "";
                    obj.tl_khop = 0;
                    data_temp_goc.Add(obj);
                    data = data.Where(n => n.id_khop_vtu != id_khop_vtu).ToList();
                }
            }
            return await Task.FromResult(data_temp_goc);
        }
        /// <summary>
        /// Đọc OCR báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDuLieuBaoGiaGara()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_OCR_BAO_GIA_GARA_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa gara báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaGaraBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Thêm gara báo giá chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> suaGaraBaoGiaCT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Duyệt gara báo giá chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> duyetGaraBaoGiaCT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            request_duyet rq = JsonConvert.DeserializeObject<request_duyet>(json);
            BaseResponse<object, out_value_phe_duyet> data = await Request.GetResponeNew<object, out_value_phe_duyet>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_DUYET, json);
            if (data != null && data.state_info != null && data.state_info.status == STATUS_OK)
            {
                var defineInfo = Request.GetDefineInfo();
                EscsUtils.CreateFileAndSendEmail(json, defineInfo, rq.gui_email);
            }
            return Ok(data);

        }

        /// <summary>
        /// Hủy duyệt gara báo giá chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyDuyetGaraBaoGiaCT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<object, out_value_phe_duyet>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_DUYET_XOA, json);
            if (data != null && data.state_info != null && data.state_info.status == STATUS_OK)
            {
                var defineInfo = Request.GetDefineInfo();
                EscsUtils.RemoveFile(json, defineInfo);
            }
            return Ok(data);
        }

        /// <summary>
        /// Lưu phương án bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> tinhPABoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_TINH_TOAN, json);
            return Ok(data);
        }

        /// <summary>
        /// Lưu phương án bồi thường phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> tinhPABoiThuongPA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_NV_TINH_TOAN, json);
            return Ok(data);
        }

        /// <summary>
        /// Xem bảng kê chi tiết tính toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemBangKeCtietPA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BANG_TINH_TOAN_PA_CTIET, json);
            return Ok(data);
        }

        /// <summary>
        /// Lưu phương án bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuPABoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy tất cả chứng từ bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layChungTuBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_CHUNG_TU_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Nhập chứng từ bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapChungTuBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_CHUNG_TU_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Xóa chứng từ bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaChungTuBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_CHUNG_TU_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy thông tin đối tác
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinDoiTac()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THONG_TIN_DOI_TAC, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy thông tin đối tác
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinDoiTacChungTu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_THONG_TIN_DOI_TAC_CHUNG_TU, json);
            return Ok(data);
        }

        /// <summary>
        /// Nhập thông tin người thụ hưởng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapThongTinNguoiThuHuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_THU_HUONG_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Xóa thông tin người thụ hưởng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaThongTinNguoiThuHuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_THU_HUONG_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// BTV chọn báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chonBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_CHON, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách vật tư thu hồi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachVatTuThuHoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_HOI_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lưu vật tư thu hồi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuVatTuThuHoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_HOI_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Xóa vật tư thu hồi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaVatTuThuHoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_HOI_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Danh sách người thứ 3 thu đòi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachNTBA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_DOI_NTBA_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lưu người thứ 3 thu đòi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuNTBA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_DOI_NTBA_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Xóa người thứ 3 thu đòi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaNTBA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_THU_DOI_NTBA_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy điều khoản bổ sung theo hạng mục
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDKBSTheoHangMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_DKBS_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy nguyên nhân giảm trừ theo hạng mục
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layNNGTTheoHangMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_GIAM_TRU_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lưu điều khoản bổ sung theo hạng mục
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuDieuKhoanBoSung()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_DKBS_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu điều khoản bổ sung theo hạng mục
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuNguyenNhanGiamTru()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_NNGT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu ghi chú
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuGhiChu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_GHI_CHU_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách tạm ứng của hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layTamUng()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TAM_UNG_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách tạm ứng của hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuTamUng()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TAM_UNG_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa tạm ứng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaTamUng()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TAM_UNG_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa tạm ứng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemCtietTamUng()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TAM_UNG_LKE_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy bào giá gara
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layBaoGiaGara()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_LKE_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Cập nhật trạng thái báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> capNhatTrangThaiBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_TT_YC, json);
            return Ok(data);
        }

        /// <summary>
        /// Chuyển báo giá sang gara liên kết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chuyenBaoGiaGara()
        {
            //PBH_BT_XE_HS_BAO_GIA_GARA_NH -> PPARTNER_GARA_BAO_GIA_XE_API_NH -> PBH_BT_XE_HS_BAO_GIA_GARA_UPDATE
            var user = GetUser();
            var json = Request.GetDataRequestNew(user);
            var data = await Request.GetResponeNew<data_chuyen_bao_gia, data_chuyen_bao_gia_out>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_NH, json);
            if (data.state_info.status == STATUS_OK && data.data_info.bg.Count > 0)
            {
                var _networkCredentials = NetworkCredentials.GetItem("ESCS_PATH_FILE");
                DefineInfo defineInfo = Request.GetDefineInfo();
                foreach (var bg in data.data_info.bg)
                {
                    var rqDataJson = data.data_info.GetRequestChuyenBG(bg);
                    rqDataJson.ma_cty_bh = bg.ma_doi_tac;
                    rqDataJson.ma_gara = bg.gara;
                    rqDataJson.buoc = "TIEP_NHAN";
                    foreach (var item in rqDataJson.hm)
                    {
                        item.tien_dx = 0;
                        item.tien_duyet = 0;
                    }
                    bg.lan_bg = data.out_value.lan_bg;
                    if (rqDataJson.file != null && rqDataJson.file.Count() > 0)
                    {
                        foreach (var item in rqDataJson.file)
                        {
                            if (!string.IsNullOrEmpty(item.duong_dan))
                            {
                                item.ext = Path.GetExtension(item.duong_dan).ToLower();
                                var path_bh = item.duong_dan;
                                var path_gr = item.duong_dan.Replace(rqDataJson.ma_cty_bh + @"\", rqDataJson.ma_gara + @"\");
                                var full_path_bh = Path.Combine(_networkCredentials.PathLocal, path_bh);
                                var full_path_gr = Path.Combine(_networkCredentials.PathLocal, path_gr);
                                var directory_bh = Path.GetDirectoryName(full_path_bh);
                                var directory_gr = Path.GetDirectoryName(full_path_gr);
                                var file_name_thumnail = "thumnail_" + Path.GetFileName(path_bh);
                                var full_path_bh_thumnail = Path.Combine(directory_bh, file_name_thumnail);
                                var full_path_gr_thumnail = Path.Combine(directory_gr, file_name_thumnail);
                                if (System.IO.File.Exists(full_path_bh))
                                {
                                    if (!Directory.Exists(directory_gr))
                                        Directory.CreateDirectory(directory_gr);
                                    //Đồng bộ file gốc
                                    if (!System.IO.File.Exists(full_path_gr))
                                        System.IO.File.Copy(full_path_bh, full_path_gr, true);
                                    item.duong_dan = path_gr;
                                }
                                if (System.IO.File.Exists(full_path_bh_thumnail))
                                {
                                    if (!Directory.Exists(directory_gr))
                                        Directory.CreateDirectory(directory_gr);
                                    //Đồng bộ file thumnail
                                    if (!System.IO.File.Exists(full_path_gr_thumnail))
                                        System.IO.File.Copy(full_path_bh_thumnail, full_path_gr_thumnail, true);
                                }
                            }
                        }
                    }
                    var jsonDataInfo = JsonConvert.SerializeObject(rqDataJson);
                    string jsonBase = HttpUtils.GetJsonBaseRequest(jsonDataInfo, defineInfo);
                    using (var httpClient = new HttpClient())
                    {
                        httpClient.BaseAddress = new Uri(BGHttpConfiguration.BaseUrl);
                        httpClient.DefaultRequestHeaders.Clear();
                        httpClient.DefaultRequestHeaders.Add("ePartnerCode", BGHttpConfiguration.GRPartnerCode);
                        httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                        httpClient.DefaultRequestHeaders.Add("eAuthToken", BGHttpConfiguration.GRAccessToken);
                        httpClient.DefaultRequestHeaders.Add("eAction", BGStoredProcedure.PPARTNER_GARA_BAO_GIA_XE_API_NH);
                        string base64UrlEncodePayLoad = Utilities.Base64UrlEncode(jsonDataInfo);
                        var signatureData = Utilities.Sha256Hash(base64UrlEncodePayLoad + "." + BGHttpConfiguration.GRSecretKey);
                        httpClient.DefaultRequestHeaders.Add("eSignature", signatureData);
                        var httpContent = new StringContent(jsonBase, Encoding.UTF8, "application/json");
                        var rp = await httpClient.PostAsync("/api/esmartclaim/excute", httpContent);
                        var kq = rp.Result<decimal?, data_chuyen_bao_gia_out>();
                        if (kq.state_info.status == STATUS_OK)
                        {
                            bg.ma_doi_tac_nsd = user.ma_doi_tac;
                            bg.ma_chi_nhanh_nsd = user.ma_doi_tac;
                            bg.nsd = user.nsd;
                            bg.pas = user.pas;
                            bg.buoc = "CHUYEN_BAO_GIA";

                            bg.so_id_bg = kq.out_value == null ? 0 : kq.out_value.so_id_bg;
                            bg.so_bg_gara = kq.out_value == null ? "" : kq.out_value.so_bg;
                            bg.lan_bg_gara = kq.out_value == null ? 0 : kq.out_value.lan_bg;
                            bg.trang_thai_api = kq.state_info.status;
                            var update = await Request.GetRespone<decimal?>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_UPDATE, bg);
                        }
                        else
                        {
                            await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_XOA, json);
                        }
                        return Ok(kq);
                    }
                }
            }
            return Ok(data);
        }

        /// <summary>
        /// Tạo lần báo giá mới
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> taoLanBaoGiaMoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_LAN_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lưu lần báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuLanBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_LAN_LUU, json);
            return Ok(data);
        }

        /// <summary>
        /// Chuyển yêu cầu báo giá mới
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chuyenLanBaoGiaMoi()
        {
            var user = GetUser();
            var json = Request.GetDataRequestNew(user);
            var data = await Request.GetResponeNew<data_chuyen_bao_gia_lan, data_chuyen_bao_gia_out>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_CHUYEN, json);
            if (data.state_info.status == STATUS_OK && data.data_info.bg != null)
            {
                DefineInfo defineInfo = Request.GetDefineInfo();
                var rqDataJson = data.data_info.GetRequestChuyenBG();
                rqDataJson.buoc = "BAO_GIA_LAI";
                rqDataJson.lan_bg = data.data_info.bg_lan.FirstOrDefault().lan_bg_gara;
                data.data_info.bg.lan_bg = data.out_value.lan_bg;

                var jsonDataInfo = JsonConvert.SerializeObject(rqDataJson);
                string jsonBase = HttpUtils.GetJsonBaseRequest(jsonDataInfo, defineInfo);
                using (var httpClient = new HttpClient())
                {
                    httpClient.BaseAddress = new Uri(BGHttpConfiguration.BaseUrl);
                    httpClient.DefaultRequestHeaders.Clear();
                    httpClient.DefaultRequestHeaders.Add("ePartnerCode", BGHttpConfiguration.GRPartnerCode);
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    httpClient.DefaultRequestHeaders.Add("eAuthToken", BGHttpConfiguration.GRAccessToken);
                    httpClient.DefaultRequestHeaders.Add("eAction", BGStoredProcedure.PPARTNER_GARA_BAO_GIA_XE_API_NH);
                    string base64UrlEncodePayLoad = Utilities.Base64UrlEncode(jsonDataInfo);
                    var signatureData = Utilities.Sha256Hash(base64UrlEncodePayLoad + "." + BGHttpConfiguration.GRSecretKey);
                    httpClient.DefaultRequestHeaders.Add("eSignature", signatureData);
                    var httpContent = new StringContent(jsonBase, Encoding.UTF8, "application/json");
                    var rp = await httpClient.PostAsync("/api/esmartclaim/excute", httpContent);
                    var kq = rp.Result<decimal?, data_chuyen_bao_gia_out>();
                    data.data_info.bg.ma_doi_tac_nsd = user.ma_doi_tac;
                    data.data_info.bg.ma_chi_nhanh_nsd = user.ma_doi_tac;
                    data.data_info.bg.nsd = user.nsd;
                    data.data_info.bg.pas = user.pas;
                    data.data_info.bg.buoc = "BAO_GIA_LAI";
                    data.data_info.bg.lan_bg_gara = kq.out_value == null ? 0 : kq.out_value.lan_bg;
                    data.data_info.bg.trang_thai_api = kq.state_info.status;
                    var update = await Request.GetRespone<decimal?>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_UPDATE, data.data_info.bg);
                    return Ok(kq);
                }
            }
            return Ok(data);
        }

        /// <summary>
        /// Chấp thuận giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chapThuanBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<gara_bao_gia>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_CHAP_NHAN_GIA, json);
            if (data.state_info.status == STATUS_OK && data.data_info != null)
            {
                DefineInfo defineInfo = Request.GetDefineInfo();
                var obj = new
                {
                    ma_cty_bh = data.data_info.ma_cty_bh,
                    ma_gara = data.data_info.ma_gara,
                    nguon_api = "CTYBH",
                    so_id = data.data_info.so_id_bg
                };

                var jsonDataInfo = JsonConvert.SerializeObject(obj);
                string jsonBase = HttpUtils.GetJsonBaseRequest(jsonDataInfo, defineInfo);
                using (var httpClient = new HttpClient())
                {
                    httpClient.BaseAddress = new Uri(BGHttpConfiguration.BaseUrl);
                    httpClient.DefaultRequestHeaders.Clear();
                    httpClient.DefaultRequestHeaders.Add("ePartnerCode", BGHttpConfiguration.GRPartnerCode);
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    httpClient.DefaultRequestHeaders.Add("eAuthToken", BGHttpConfiguration.GRAccessToken);
                    httpClient.DefaultRequestHeaders.Add("eAction", BGStoredProcedure.PPARTNER_GARA_BAO_GIA_GARA_XAC_NHAN);
                    string base64UrlEncodePayLoad = Utilities.Base64UrlEncode(jsonDataInfo);
                    var signatureData = Utilities.Sha256Hash(base64UrlEncodePayLoad + "." + BGHttpConfiguration.GRSecretKey);
                    httpClient.DefaultRequestHeaders.Add("eSignature", signatureData);
                    var httpContent = new StringContent(jsonBase, Encoding.UTF8, "application/json");
                    var rp = await httpClient.PostAsync("/api/esmartclaim/excute", httpContent);
                    var kq = rp.Result();
                }
            }
            data.data_info = null;
            return Ok(data);
        }

        /// <summary>
        /// Yêu cầu sửa chữa
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> YeuCauSuaChua()
        {
            var user = GetUser();
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<data_chuyen_bao_gia_lan, data_chuyen_bao_gia_out>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_YCSC, json);
            if (data.state_info.status == STATUS_OK && data.data_info != null)
            {
                DefineInfo defineInfo = Request.GetDefineInfo();
                var rqDataJson = data.data_info.GetRequestChuyenBG();

                rqDataJson.ma_cty_bh = data.data_info.bg.ma_cty_bh;
                rqDataJson.ma_gara = data.data_info.bg.ma_gara;
                rqDataJson.buoc = "SUA_CHUA";
                rqDataJson.lan_bg = data.data_info.bg_lan.FirstOrDefault().lan_bg_gara;
                data.data_info.bg.lan_bg = data.out_value.lan_bg;

                var jsonDataInfo = JsonConvert.SerializeObject(rqDataJson);
                string jsonBase = HttpUtils.GetJsonBaseRequest(jsonDataInfo, defineInfo);

                using (var httpClient = new HttpClient())
                {
                    httpClient.BaseAddress = new Uri(BGHttpConfiguration.BaseUrl);
                    httpClient.DefaultRequestHeaders.Clear();
                    httpClient.DefaultRequestHeaders.Add("ePartnerCode", BGHttpConfiguration.GRPartnerCode);
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    httpClient.DefaultRequestHeaders.Add("eAuthToken", BGHttpConfiguration.GRAccessToken);
                    httpClient.DefaultRequestHeaders.Add("eAction", BGStoredProcedure.PPARTNER_GARA_BAO_GIA_CTYBH_YCSC);
                    string base64UrlEncodePayLoad = Utilities.Base64UrlEncode(jsonDataInfo);
                    var signatureData = Utilities.Sha256Hash(base64UrlEncodePayLoad + "." + BGHttpConfiguration.GRSecretKey);
                    httpClient.DefaultRequestHeaders.Add("eSignature", signatureData);
                    var httpContent = new StringContent(jsonBase, Encoding.UTF8, "application/json");
                    var rp = await httpClient.PostAsync("/api/esmartclaim/excute", httpContent);
                    var kq = rp.Result<decimal?, data_chuyen_bao_gia_out>();

                    data.data_info.bg.ma_doi_tac_nsd = user.ma_doi_tac;
                    data.data_info.bg.ma_chi_nhanh_nsd = user.ma_doi_tac;
                    data.data_info.bg.nsd = user.nsd;
                    data.data_info.bg.pas = user.pas;
                    data.data_info.bg.buoc = "YCSC";

                    data.data_info.bg.lan_bg_gara = kq.out_value == null ? 0 : kq.out_value.lan_bg;
                    data.data_info.bg.trang_thai_api = kq.state_info.status;
                    var update = await Request.GetRespone<decimal?>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_UPDATE, data.data_info.bg);
                    return Ok(kq);
                }
            }
            data.data_info = null;
            return Ok(data);
        }

        /// <summary>
        /// Hủy báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> HuyBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<gara_bao_gia>(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_GARA_TTHAI, json);
            if (data.state_info.status == STATUS_OK && data.data_info != null)
            {
                DefineInfo defineInfo = Request.GetDefineInfo();
                var obj = new
                {
                    ma_cty_bh = data.data_info.ma_cty_bh,
                    ma_gara = data.data_info.ma_gara,
                    nguon_api = "CTYBH",
                    so_id_bg = data.data_info.so_id_bg,
                    buoc = "HUY_BG"
                };

                var jsonDataInfo = JsonConvert.SerializeObject(obj);
                string jsonBase = HttpUtils.GetJsonBaseRequest(jsonDataInfo, defineInfo);
                using (var httpClient = new HttpClient())
                {
                    httpClient.BaseAddress = new Uri(BGHttpConfiguration.BaseUrl);
                    httpClient.DefaultRequestHeaders.Clear();
                    httpClient.DefaultRequestHeaders.Add("ePartnerCode", BGHttpConfiguration.BHPartnerCode);
                    httpClient.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                    httpClient.DefaultRequestHeaders.Add("eAuthToken", BGHttpConfiguration.BHAccessToken);
                    httpClient.DefaultRequestHeaders.Add("eAction", BGStoredProcedure.PPARTNER_GARA_BAO_GIA_KH_API_TTHAI);
                    string base64UrlEncodePayLoad = Utilities.Base64UrlEncode(jsonDataInfo);
                    var signatureData = Utilities.Sha256Hash(base64UrlEncodePayLoad + "." + BGHttpConfiguration.BHSecretKey);
                    httpClient.DefaultRequestHeaders.Add("eSignature", signatureData);
                    var httpContent = new StringContent(jsonBase, Encoding.UTF8, "application/json");
                    var rp = await httpClient.PostAsync("/api/esmartclaim/excute", httpContent);
                    var kq = rp.Result();
                }
            }
            data.data_info = null;
            return Ok(data);
        }

        /// <summary>
        /// Update khách hàng VIP
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> updateKHVIP()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_KH_VIP, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy thông tin khai báo chi tiết hạng mục
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layChiTietHangMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_CT_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Nhập thông tin khai báo chi tiết hạng mục
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuChiTietHangMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_CT_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy hạng mục theo LHNV
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layHangMucLHNV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_TKIEM, json);
            return Ok(data);
        }

        /// <summary>
        /// Phân loại hạng mục tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> phanLoaiHangMucTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PHAN_HANG_MUC, json);
            var defineInfo = Request.GetDefineInfo();
            #region Phân loại và đọc ocr
            Task task = new Task(async () =>
            {
                try
                {
                    var dich_vu = await Request.GetResponeNewWithDefineInfo<bh_dich_vu_ocr>(StoredProcedure.PBH_DICH_VU_OCR_LKE_CT, json, "/api/esmartclaim/excute", defineInfo);
                    if (dich_vu != null && dich_vu.data_info != null && dich_vu.state_info.status == STATUS_OK && dich_vu.data_info.ap_dung == 1)
                    {
                        phan_loai_tai_lieu tai_lieu = JsonConvert.DeserializeObject<phan_loai_tai_lieu>(json);
                        if (tai_lieu.bt != null && tai_lieu.bt.Count() > 0 &&
                        (tai_lieu.hang_muc == dich_vu.data_info.hm_dky_xe ||
                        tai_lieu.hang_muc == dich_vu.data_info.hm_dkiem_xe ||
                        tai_lieu.hang_muc == dich_vu.data_info.hm_gplx ||
                        tai_lieu.hang_muc == dich_vu.data_info.hm_hddt))
                        {
                            foreach (var item in tai_lieu.bt)
                            {
                                hang_muc_tai_lieu tl = new hang_muc_tai_lieu();
                                tl.ma_doi_tac_nsd = tai_lieu.ma_doi_tac_nsd;
                                tl.ma_chi_nhanh_nsd = tai_lieu.ma_chi_nhanh_nsd;
                                tl.nsd = tai_lieu.nsd;
                                tl.pas = tai_lieu.pas;
                                tl.so_id = tai_lieu.so_id;
                                tl.bt = item;
                                var json_rq_file = JsonConvert.SerializeObject(tl);
                                var file = await Request.GetResponeNewWithDefineInfo<bh_file>(StoredProcedure.PHT_BH_FILE_TAI_FILE, json_rq_file, "/api/esmartclaim/get-file", defineInfo);
                                if (file.data_info == null || string.IsNullOrEmpty(file.data_info.duong_dan))
                                {
                                    continue;
                                }
                                if (tai_lieu.hang_muc == dich_vu.data_info.hm_gplx)
                                {
                                    var image = Utilities.ResizeImage(Utilities.byteArrayToImage(Convert.FromBase64String(file.data_info.duong_dan)), new Size(550, 550));
                                    var arr = Utilities.ImageToByteArray(image);
                                    var result = await OCRService.OCRCar<List<ocr_data<ocr_giay_phep_lai_xe>>>(arr, dich_vu.data_info.base_url, dich_vu.data_info.api_key);
                                    if (result != null && result.Count() > 0 && result[0].value != null)
                                    {
                                        ocr_giay_phep_lai_xe_tmp tmp = result[0].value.GetData();
                                        tmp.ma_doi_tac_nsd = tai_lieu.ma_doi_tac_nsd;
                                        tmp.ma_chi_nhanh_nsd = tai_lieu.ma_chi_nhanh_nsd;
                                        tmp.nsd = tai_lieu.nsd;
                                        tmp.pas = tai_lieu.pas;
                                        tmp.so_id = tai_lieu.so_id;
                                        var r_file = await Request.GetResponeNewWithDefineInfo(StoredProcedure.PHT_OCR_BANG_LAI_OTO_NH, JsonConvert.SerializeObject(tmp), "/api/esmartclaim/excute", defineInfo);
                                    }
                                }
                                if (tai_lieu.hang_muc == dich_vu.data_info.hm_dky_xe)
                                {
                                    var image = Utilities.ResizeImage(Utilities.byteArrayToImage(Convert.FromBase64String(file.data_info.duong_dan)), new Size(550, 550));
                                    var arr = Utilities.ImageToByteArray(image);
                                    var result = await OCRService.OCRCar<List<ocr_data<ocr_dang_ky_xe>>>(arr, dich_vu.data_info.base_url, dich_vu.data_info.api_key);
                                    if (result != null && result.Count() > 0 && result[0].value != null)
                                    {
                                        ocr_dang_ky_xe_tmp tmp = result[0].value.GetData();
                                        tmp.ma_doi_tac_nsd = tai_lieu.ma_doi_tac_nsd;
                                        tmp.ma_chi_nhanh_nsd = tai_lieu.ma_chi_nhanh_nsd;
                                        tmp.nsd = tai_lieu.nsd;
                                        tmp.pas = tai_lieu.pas;
                                        tmp.so_id = tai_lieu.so_id;
                                        var r_file = await Request.GetResponeNewWithDefineInfo(StoredProcedure.PHT_OCR_DANG_KY_OTO_NH, JsonConvert.SerializeObject(tmp), "/api/esmartclaim/excute", defineInfo);
                                    }
                                }
                                if (tai_lieu.hang_muc == dich_vu.data_info.hm_dkiem_xe)
                                {
                                    var image = Utilities.ResizeImage(Utilities.byteArrayToImage(Convert.FromBase64String(file.data_info.duong_dan)), new Size(550, 550));
                                    var arr = Utilities.ImageToByteArray(image);
                                    var result = await OCRService.OCRCar<List<ocr_data<ocr_dang_kiem>>>(arr, dich_vu.data_info.base_url, dich_vu.data_info.api_key);
                                    if (result != null && result.Count() > 0 && result[0].value != null)
                                    {
                                        ocr_dang_kiem_tmp tmp = result[0].value.GetData();
                                        tmp.ma_doi_tac_nsd = tai_lieu.ma_doi_tac_nsd;
                                        tmp.ma_chi_nhanh_nsd = tai_lieu.ma_chi_nhanh_nsd;
                                        tmp.nsd = tai_lieu.nsd;
                                        tmp.pas = tai_lieu.pas;
                                        tmp.so_id = tai_lieu.so_id;
                                        var r_file = await Request.GetResponeNewWithDefineInfo(StoredProcedure.PHT_OCR_DANG_KIEM_OTO_NH, JsonConvert.SerializeObject(tmp), "/api/esmartclaim/excute", defineInfo);
                                    }
                                }
                                if (tai_lieu.hang_muc == dich_vu.data_info.hm_hddt)
                                {
                                    ReadEBill objInput = new ReadEBill();
                                    objInput.EBillXmlContent = Utilities.Base64Decode(file.data_info.duong_dan);

                                    EBill eBill = await BillService.GetDataBill(objInput);
                                    if (eBill != null && !string.IsNullOrEmpty(eBill.InvoiceNumber))
                                    {
                                        eBill.Ct = eBill.Items.Item;
                                        eBill.Items = null;
                                        eBill.ma_doi_tac_nsd = tai_lieu.ma_doi_tac_nsd;
                                        eBill.ma_chi_nhanh_nsd = tai_lieu.ma_chi_nhanh_nsd;
                                        eBill.nsd = tai_lieu.nsd;
                                        eBill.pas = tai_lieu.pas;
                                        eBill.so_id = tai_lieu.so_id;
                                        var eBillJson = JsonConvert.SerializeObject(eBill, Newtonsoft.Json.Formatting.None, new JsonSerializerSettings
                                        {
                                            ContractResolver = new LowercaseContractResolver()
                                        });
                                        var r_ebill = await Request.GetResponeNewWithDefineInfo(StoredProcedure.PBH_DOC_EBILL_NH, eBillJson, "/api/esmartclaim/excute", defineInfo);
                                    }
                                }
                            }
                        }
                    }

                }
                catch
                {

                }

            });
            task.Start();
            #endregion
            return Ok(data);
        }

        /// <summary>
        /// Bồi thường toàn bộ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> BoiThuongToanBo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TON_THAT_TOAN_BO, json);
            return Ok(data);
        }

        /// <summary>
        /// Xóa bồi thường toàn bộ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> XoaBoiThuongToanBo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TON_THAT_TOAN_BO_XOA, json);
            return Ok(data);
        }

        /// <summary>
        /// Lưu phương án VCX
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuPhuongAnVCX()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lưu phương án nghiệp vụ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuPhuongAnNV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_NV_CT_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Xóa phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaPhuongAn()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_X, json);
            return Ok(data);
        }

        /// <summary>
        /// Chọn phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chonPhuongAn()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_CHON, json);
            return Ok(data);
        }

        /// <summary>
        /// Bỏ chọn phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> boChonPhuongAn()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_BO_CHON, json);
            return Ok(data);
        }

        /// <summary>
        /// Thêm mới phương án tổng hợp
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ThemPhuongAn()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_NV_TONG_HOP_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy thông tin giảm giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinGiamGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_GIA_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Luu thông tin giảm giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinGiamGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_GIA_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy thông tin khấu trừ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layKhauTru()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_KTRU_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy thông tin khấu trừ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layKhauTruPA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_CT_KTRU_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Luu thông tin khấu trừ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinKhauTru()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_GIA_KTRU_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Luu thông tin khấu trừ phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinKhauTruPA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_CT_GIA_KTRU_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Kết thúc báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ketThucBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_KT, json);
            return Ok(data);
        }

        /// <summary>
        /// Hủy kết thúc báo giá
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyKetThucBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_HUY_KT, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách giảm giá phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachGiamGiaPA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_CT_GIA_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Luu thông tin giảm giá phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinGiamGiaPA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_CT_GIA_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Xem bảng giá chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemBangGiaChiTiet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BANG_TINH_TOAN_CTIET, json);
            return Ok(data);
        }

        /// <summary>
        /// Chuyển hướng trang
        /// </summary>
        /// <param name="ma_doi_tac"></param>
        /// <param name="so_id"></param>
        /// <param name="hanh_dong"></param>
        /// <param name="url_redirect"></param>
        /// <returns></returns>
        public IActionResult TransInvestigationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(ma_doi_tac + "/" + so_id + "/" + hanh_dong, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }

        /// <summary>
        /// Lấy danh sách phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDSPhuongAn()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách chi tiết phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemChiTietPhuongAn()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_LKE_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Chuyển thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chuyenThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_CHUYEN_THANH_TOAN, json, "/api/esmartclaim/transfer-payment");
            return Ok(data);
        }

        /// <summary>
        /// Hủy chuyển thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyChuyenThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_HUY_CHUYEN_THANH_TOAN, json, "/api/esmartclaim/un-transfer-payment");
            return Ok(data);
        }

        /// <summary>
        /// Lấy thông tin thuế
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThue()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_THUE_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Luu thông tin thuế
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinThue()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_NV_THUE_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin thuế phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThuePA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_CT_THUE_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Luu thông tin thuế phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinThuePA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_CT_THUE_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Luu thông tin BTV DANH GIA
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinDanhGiaBTV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_DANH_GIA_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Luu thông tin BTV DANH GIA HSBT
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinBTVDanhGiaHSBT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_DANH_GIA_BTV_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Luu thông tin BTV DANH GIA HSBT
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemthongTinChiTietBTVDanhGiaHSBT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_DANH_GIA_BTV_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        ///Liet ke chi tiet thông tin BTV DANH GIA
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemthongTinChiTietBTVDanhGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_DANH_GIA_LKE_CT, json);
            return Ok(data);
        }

        /// <summary>
        /// Hủy hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_HUY, json, "/api/esmartclaim/destroy");
            return Ok(data);
        }
        /// <summary>
        /// Gỡ hủy hồ sơ bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> goHuyHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_GO_HUY, json, "/api/esmartclaim/undestroy");
            return Ok(data);
        }
        /// <summary>
        ///Nhap thong tin OCR bao gia
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinOCRBaoGiaGara()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_OCR_NH, json);
            return Ok(data);
        }
        /// <summary>
        ///Nhap thong tin OCR hoa don
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinOCRHoaDonChungTuXe()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_OCR_CHUNG_TU_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Tách nghiệp vụ hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> tachNghiepVuHs()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_TACH_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy so sánh báo gia gara
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> laySoSanhBGGara()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_BAO_GIA_SO_SANH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy LHNV của phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layLHNVPhuongAn()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_LHNV_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy thông tin bảng giá PA
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layBangChiTietPAView()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_PA_BANG_VIEW, json);
            return Ok(data);
        }
    }
}