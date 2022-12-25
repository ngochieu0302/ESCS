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
using ESCS.COMMON.Contants;
using ESCS.MODEL.ESCS;
using ESCS.COMMON.Http;
using Newtonsoft.Json;
using ESCS.COMMON.Response;
using System.Collections;
using Newtonsoft.Json.Linq;
using ESCS.COMMON.Common;
using ESCS.COMMON.OCR;

namespace ESCS.Areas.HealthClaim.Controllers
{
    [Area("HealthClaim")]
    [SystemAuthen]
    public class HealthClaimCommonController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Lấy danh sách cơ sở y tế
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDSCoSoYTe()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_BENH_VIEN_CACHE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách bệnh viện
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDsBenhVien()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_BENH_VIEN_BV_CACHE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách nhà thuốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDsNhaThuoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_BENH_VIEN_NT_CACHE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách nhà thuốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDsLHNV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_LHNV_CN_CACHE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDsQlGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_QLOI_GOC_LKE_LHNV, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh mục chung
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDMChung()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_MA_DANH_MUC_CACHE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách quá trình xử lý
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> quaTrinhXuLy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_QTXL_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách lịch sử tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lichSuTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LSTT, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDsQloiGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_QLOI_GOC_XEM, json);
            return Ok(data);
        }

        /// <summary>
        /// Lưu hồ sơ giấy tờ
        /// </summary>
        /// <returns></returns>
        ///       
        [AjaxOnly]
        public async Task<IActionResult> SaveDocumentBs()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_LUU, json, "/api/esmartclaim/document");
            return Ok(data);
        }
        /// <summary>
        /// Lấy lại hồ sơ giấy tờ
        /// </summary>
        /// <returns></returns>
        ///  [AjaxOnly]
        public async Task<IActionResult> GetDocument()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách chi phí bảo hiểm con người
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDSChiPhi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_BENH_CHI_PHI_TKIEM, json);
            return Ok(data);
        }

        /// <summary>
        /// Lưu thông tin chi phí
        /// </summary>
        /// <returns></returns>
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin")]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinChiPhi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_CHI_PHI_NHAP, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách quyền lợi bảo hiểm lịch sử tổn thất
        /// </summary>
        /// <returns></returns>
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin")]
        [AjaxOnly]
        public async Task<IActionResult> layHoSoQuyenLoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_QLOI_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách files thumnail
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetFilesThumnail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_THUMNAIL, json, "/api/esmartclaim/get-file-thumnail");
            return Ok(data);
        }
        /// <summary>
        /// Lấy file hiển thị
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetFiles()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_TAI_FILE, json, "/api/esmartclaim/get-file");
            return Ok(data);
        }
        /// <summary>
        /// Download zip file
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DownloadZipFile()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_TAI_FILE_NEN, json, "/api/esmartclaim/download-zip-file");
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin hạng mục tài liệu")]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinHangMucTaiLieu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_NG_HANG_MUC_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin danh mục bệnh viện nhà thuốc")]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinDanhMucBVNT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_BENH_VIEN_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu tạo lần nhận xét
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> taoNhanXet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_ND_TRINH_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách nội dung
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachNoiDung()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_ND_TRINH_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê danh sách nội dung
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietKePhanTrangNoiDung()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_ND_TRINH_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa thông tin nội dung
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaThongTinNoiDung()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_ND_TRINH_X, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê danh sách người tham gia trao đổi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietKeDanhSachCanBoTraoDoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRAO_DOI_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Thêm cán bộ trao đổi
        /// </summary>
        /// <returns></returns>
        [ESCSDescription(ESCSMethod.POST, "Thêm cán bộ trao đổi")]
        [AjaxOnly]
        public async Task<IActionResult> themCanBoTraoDoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRAO_DOI_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa cán bộ trao đổi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaCanBoTraoDoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRAO_DOI_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập nội dung trao đổi
        /// </summary>
        /// <returns></returns>
        [ESCSDescription(ESCSMethod.POST, "Nhập nội dung trao đổi")]
        [AjaxOnly]
        public async Task<IActionResult> nhapNoiDungTraoDoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRAO_DOI_ND_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê nội dung trao đổi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietKeNoiDungTraoDoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRAO_DOI_ND_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách file
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetListFiles()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_FILE_XEM_DANH_SACH, json, "/api/esmartclaim/get-paging-file");
            return Ok(data);
        }
        /// <summary>
        /// Toàn bộ thông tin hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layToanBoThongTinHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_TOAN_BO_THONG_TIN_HO_SO, json);
            return Ok(data);
        }
        /// <summary>
        /// Toàn bộ thông tin hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> kiemTraTrungCSYT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_KIEM_TRA_TRUNG_CSYT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách cảnh báo
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> danhSachCanhBao()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_CANH_BAO_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Xem tình trạng thanh toán phí
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemTinhTrangTTPhi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KY_THANH_TOAN_LKE, json, "/api/partner/get-payment");
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách liên hệ cơ sở y tế
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetContract()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HD_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách hồ sơ quyền lợi đã sủ dụng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> LayHoSoQLoiDaDung()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_QL_DA_DUNG, json);
            return Ok(data);
        }
        /// <summary>
        /// Chuyển sang màn hình hồ sơ
        /// </summary>
        /// <returns></returns>
        public IActionResult TransCompensationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            try
            {
                Task task = new Task(() =>
                {
                    TempData[ESCSConstants.NOTIFY_INFO] = ma_doi_tac + "/" + so_id + "/" + hanh_dong;
                });
                task.Start();
            }
            catch
            {

            }
            return LocalRedirect(url_redirect);
        }
        //Xem chi tiết hồ sơ bảo lãnh
        public IActionResult TransHealthguaranteeDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            try
            {
                TempData[ESCSConstants.NOTIFY_INFO] = ma_doi_tac + "/" + so_id + "/" + hanh_dong;
            }
            catch
            {

            }
            return LocalRedirect(url_redirect);
        }
        public IActionResult TransReceiveDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            try
            {
                TempData[ESCSConstants.NOTIFY_INFO] = ma_doi_tac + "/" + so_id + "/" + hanh_dong;
            }
            catch
            {

            }
            return LocalRedirect(url_redirect);
        }
        public IActionResult TransHealthcompensationDisplay(string ma_doi_tac, string so_id, string hanh_dong, string url_redirect)
        {
            try
            {
                TempData[ESCSConstants.NOTIFY_INFO] = ma_doi_tac + "/" + so_id + "/" + hanh_dong;
            }
            catch
            {

            }
            return LocalRedirect(url_redirect);
        }
        /// <summary>
        /// Xem thông tin quyền lợi bảo hiểm
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemThongTinQuyenLoiBaoHiem()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_QLOI_GOC_LKE_TT, json);
            return Ok(data);
        }

        /// <summary>
        /// Tích hợp hệ thống
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> tichHopConNguoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PTICH_HOP_HOP_DONG_CON_NGUOI_MIC, json, "/api/health/get-policy");
            return Ok(data);
        }
        /// <summary>
        /// Xem thông tin chi tiết GCN
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinGCN()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NGUOI_DS_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Ước tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuUocTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_UOC_TON_THAT_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layUocTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_UOC_TON_THAT_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> suaThongTinNguoiLH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_UPDATE_NGUOI_LH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> suaThongTinNguoiTB()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_UPDATE_NGUOI_TB, json);
            return Ok(data);
        }

        [AjaxOnly]
        public async Task<IActionResult> tichHopCN()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var urlApi = "/api/esmartclaim/excute";
            if (AppSettings.ConnectApiCorePartnerHealth && AppSettings.InsuranceToCore)
            {
                urlApi = "/api/health/insurance";
                var data = await Request.GetResponeNew(StoredProcedure.PTICH_HOP_DL_BOI_THUONG_CON_NGUOI_MIC, json, urlApi);
                return Ok(data);
            }
            else
            {
                var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CAP_NHAT_SO_HS, json, urlApi);
                return Ok(data);
            }    
        }

        [AjaxOnly]
        public async Task<IActionResult> updateTrangThaiHsGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HS_TRANG_THAI_HS_GOC, json);
            return Ok(data);
        }
        //Đọc OCR
        [AjaxOnly]
        public async Task<IActionResult> DocOCR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_DOC_OCR, json, "/api/health/ocr-image");
            return Json(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layThongTinDuLieuOCR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_OCR_GIAY_TO_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDsGoiBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_GETALL, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDsQLNDBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NGUOI_DS_DK_LKE_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> luuQuyenLoiHopDongCu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PTICH_HOP_HOP_DONG_CON_NGUOI_CU_MIC, json, "/api/health/get-old-policy");
            return Ok(data);
        }
        /// <summary>
        /// Thêm nội dung trao đổi bệnh viện
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapNoiDungTraoDoiBV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRAO_DOI_ND_BV_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê nội dung trao đổi bệnh viện
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietKeNoiDungTraoDoiBV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRAO_DOI_ND_BV_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu tạo lần ghi chú
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> themGhiChu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NOI_DUNG_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê danh sách ghi chú
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietKePhanTrangGhiChu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NOI_DUNG_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách ghi chú
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachGhiChu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NOI_DUNG_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách ghi chú
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaThongTinGhiChu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NOI_DUNG_X, json);
            return Ok(data);

        }
        /// <summary>
        /// Lấy danh sách lấy tờ cấu hình OCR
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachGiayToOCR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_OCR_GIAY_TO_CAU_HINH_LKE, json);
            return Ok(data);

        }
        /// <summary>
        /// Cập nhật thông tin OCR
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> capNhatThongTinOCRConNguoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_CAP_NHAT_OCR, json);
            return Ok(data);

        }
        /// <summary>
        /// Cập nhật thông tin OCR
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> soSanhDuLieuOCRHoaDon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HS_OCR_HOA_DON_SO_SANH, json);
            return Ok(data);
        }
        /// <summary>
        /// Cập nhật thông tin OCR hóa đơn
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> capNhatThongTinOCRHoaDon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUNG_TU_OCR_NH, json);
            return Ok(data);

        }
        /// <summary>
        /// Lấy dịch vụ sức khỏe chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachDichVuChiTiet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_DICH_VU_SUC_KHOE_CT_CACHE, json);
            return Ok(data);
        }
        /// <summary>
        /// SLA chi tiết
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemThongTinSLA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_SLA_KQ_LKE, json);
            return Ok(data);
        }
    }
}
