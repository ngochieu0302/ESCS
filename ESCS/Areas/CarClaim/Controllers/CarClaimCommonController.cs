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
using ESCS.MODEL.ESCS.OutValues;
using ESCS.Common;
using Newtonsoft.Json;
using ESCS.MODEL.ESCS.ModelView;
using ESCS.MODEL.ESCS;
using ESCS.COMMON.Common;
using ESCS.COMMON.Http;
using Newtonsoft.Json.Linq;
using System.Drawing;
using ESCS.COMMON.OCR;
using ESCS.COMMON.Response;
using ESCS.COMMON.AI;
using System.IO;
using System.Net.Http;
using System.Web;

namespace ESCS.Areas.CarClaim.Controllers
{
    [Area("CarClaim")]
    [SystemAuthen]
    public class CarClaimCommonController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> trinhDuyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_TRINH_DUYET_N_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> trinhDuyetKhac()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_TRINH_DUYET_KHAC_NH, json);
            var defineInfo = Request.GetDefineInfo();
            if (data != null && data.state_info != null && data.out_value != null && data.state_info.status == STATUS_OK)
            {
                EscsUtils.CreateSaveFile(json, defineInfo);
            }
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> huyTrinhDuyet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_TRINH_DUYET_XOA, json);
            var defineInfo = Request.GetDefineInfo();
            if (data != null && data.state_info != null && data.out_value != null && data.state_info.status == STATUS_OK)
            {
                EscsUtils.RemoveFile(json, defineInfo);
            }
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> huyTrinhDuyetKhac()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<int?, out_value_phe_duyet>(StoredProcedure.PBH_BT_TRINH_DUYET_KHAC_XOA, json);
            var defineInfo = Request.GetDefineInfo();
            if (data != null && data.state_info != null && data.out_value != null && data.state_info.status == STATUS_OK)
            {
                EscsUtils.RemoveFile(json, defineInfo);
            }
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layThongTinDuyetHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TRINH_DUYET_LICH_SU_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDanhMucHoSoGiayTo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_DMUC, json);
            return Ok(data);
        }

        [AjaxOnly]
        public async Task<IActionResult> luuHoSoGiayTo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_PHAN_HANG_PHU_NH, json);
            return Ok(data);
        }
        
        [AjaxOnly]
        public async Task<IActionResult> xoaHoSoGiayTo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_GD_PHAN_HANG_PHU_XOA, json);
            return Ok(data);
        }

        [AjaxOnly]
        public async Task<IActionResult> SaveAdditionalDocument()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_NH, json);
            return Ok(data);
        }

        [AjaxOnly]
        public async Task<IActionResult> SaveDocumentBs()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_LUU, json, "/api/esmartclaim/document");
            return Ok(data);
        }

        [AjaxOnly]
        public async Task<IActionResult> GetDocument()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> DeleteDocument()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy điều khoản bổ sung của đối tượng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDKBSXe()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_DKBS_TKIEM, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin tiến trình bồi thường xe
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinTienTrinh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEN_TRINH_XE_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Đọc OCR tài liệu
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DocOCR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_DOC_OCR, json, "/api/esmartclaim/ocr-image");
            return Ok(data);
        }
        /// <summary>
        /// Đọc OCR báo giá
        /// </summary>
        /// <returns></returns>
        /// PRICE_QUOTATION
        [AjaxOnly]
        public async Task<IActionResult> DocOCRBaoGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_DOC_BAO_GIA_OCR, json, "/api/esmartclaim/price-quotation");
            return Ok(data);
        }
        /// <summary>
        /// Nhận diện AI
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> NhanDienAI()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_FILE_NHAN_DIEN_AI, json, "/api/esmartclaim/detect-image");
            return Ok(data);
        }

        /// <summary>
        /// Lấy thông tin trình theo hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layTrinhXinYKien()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_HS_LKE, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy lịch sử xin ý kiến
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> LayLichSuXinYKien()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_LICH_SU_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập cấu hình xin ý kiến
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> NhomXinYKienNh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_NGUOI_XIN_Y_KIEN_MAU_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu xin ý kiến
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> XinYKienNh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy xin ý kiến
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> XinYKienX()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê chi tiết xin ý kiến
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> YKienCT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu cho ý kiến
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ChoYKienNh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_NSD_CT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách nsd ý kiến theo chi nhánh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layNsdYKienTheoChiNhanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_NSD_CNHANH_Y_KIEN_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách nsd ý kiến theo danh sách
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layNsdYKienTheoDanhSach()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_NSD_CNHANH_Y_KIEN_LKE_NSD, json);
            return Ok(data);
        }
        /// <summary>
        /// Trình/hủy trình xin ý kiến
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> trinhGuiYKien()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_TRINH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy nội dung
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layNoiDungYKien()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_Y_KIEN_NOI_DUNG, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê thông tin đơn vị
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> lietKeThongTinDonVi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CHI_PHI_KHAC_LKE_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê + phân trang chi phí khác
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getPagingChiPhiKhac()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CHI_PHI_KHAC_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Liệt kê chi tiết chi phí khác
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getDetailChiPhiKhac()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CHI_PHI_KHAC_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin chi phí khác
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinChiPhiKhac()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CHI_PHI_KHAC_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Chi phí khác của hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chiPhiKhacHS()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CHI_PHI_KHAC_HS_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu thông tin tính toán chi phí khác của hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuTinhToanCPKhac()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CHI_PHI_KHAC_HS_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa thông tin chi phí khác
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaThongTinChiPhiKhac()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CHI_PHI_KHAC_X, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu ước tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuUocTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_UOC_TON_THAT_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy ước tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layUocTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_UOC_TON_THAT_CT, json);
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
        /// Lấy danh sách cảnh báo
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> danhSachCanhBao()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CANH_BAO_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Sửa GCN
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> suaGCN()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DS_SUA, json);
            return Ok(data);
        }
        /// <summary>
        /// Sửa GCN CTCT
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> suaGCNCTCT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DS_SUA_CTCT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin giấy chứng nhận từ phía đối tác và inport vào DB ESCS
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinGCN()
        {
            if (!AppSettings.ConnectApiCorePartner)
                return Ok(new BaseResponse<string>());
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PTICH_HOP_HOP_DONG_XE, json, "/api/partner/get-policy");
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
        /// Xem toàn bộ thông tin hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemToanBoThongTinHoSoBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_THONG_TIN_TOAN_BO_HS, json);
            return Ok(data);
        }
        /// <summary>
        /// Xem thông tin hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemThongTinHoSoBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_THONG_TIN_HO_SO_BOI_THUONG, json);
            return Ok(data);
        }
        /// <summary>
        /// Xem thông tin SLA
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemThongTinSLA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_SLA_KQ_LKE, json);
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
        /// Lưu thông tin cấu hình Email
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> luuCauHinhGuiEmail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CAU_HINH_EMAIL_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layThongTinOCR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_OCR_GIAY_TO_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> lietKeDanhSachGiayToOCR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_OCR_GIAY_TO_CAU_HINH_LKE, json);
            return Ok(data);
        }
        /// <summary>
        ///So sanh thong tin OCR hoa don
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> soSanhThongTinOCRHoaDon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HS_OCR_HOA_DON_SO_SANH, json);
            return Ok(data);
        }

        /// <summary>
        /// Xem giá gợi ý
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemGiaGoiY()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_GIA_TU_DONG_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Cập thông tin OCR hóa đơn chứng từ xe
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> capNhatThongTinHoaDon()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_HS_CHUNG_TU_OCR_NH, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách video của hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getListVideo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_FILE_VIDEO_LKE, json, "/api/carclaim/get-list-video");
            return Ok(data);
        }

        /// <summary>
        /// Lấy link video
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xemVideoHs()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew<bh_file_video>(StoredProcedure.PBH_FILE_VIDEO_LKE_CT, json);
            if (data!=null && data.data_info!=null && data.data_info.bt != null && data.data_info.bt != 0)
            {
                var hashVideo = HttpUtility.UrlEncode(Utilities.EncryptByKey(data.data_info.bt.ToString(), AppSettings.KeyEryptData));
                data.data_info.duong_dan = "/carclaim/carclaimcommon/video?hashVideo=" + hashVideo;
            }
            return Ok(data);
        }

        /// <summary>
        /// Xem video
        /// </summary>
        /// <param name="hashVideo"></param>
        /// <returns></returns>
        public async Task<IActionResult> video(string hashVideo)
        {
            var nguoi_dung = GetUser();
            if (nguoi_dung ==null)
                return Redirect("/dang-nhap");
            if (string.IsNullOrEmpty(hashVideo))
                throw new Exception("Không xác định được video.");
            var idVideo = Utilities.DecryptByKey(hashVideo, AppSettings.KeyEryptData);

            using (var service = new HttpClient())
            {
                service.BaseAddress = new Uri(HttpConfiguration.BaseUrl);
                service.DefaultRequestHeaders.Clear();
                service.DefaultRequestHeaders.Add("eAuthToken", HttpConfiguration.AccessToken);
                service.DefaultRequestHeaders.Add("eAction", StoredProcedure.PBH_FILE_VIDEO_LKE_CT);
                service.DefaultRequestHeaders.Add("eSignature", "");
                service.DefaultRequestHeaders.Add("ma_doi_tac_nsd", nguoi_dung.ma_doi_tac);
                service.DefaultRequestHeaders.Add("ma_chi_nhanh_nsd", nguoi_dung.ma_chi_nhanh);
                service.DefaultRequestHeaders.Add("nsd", nguoi_dung.nsd);
                service.DefaultRequestHeaders.Add("pas", nguoi_dung.pas);
                var fileStream = await service.GetByteArrayAsync("/api/carclaim/video/"+ idVideo);
                return File(fileStream, contentType: "application/octet-stream", enableRangeProcessing: true);
            }
        }

        /// <summary>
        /// Upload video
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        [SystemAuthen]
        public async Task<ActionResult> uploadVideo()
        {
            if (!Utilities.IsMultipartContentType(Request.ContentType))
                return BadRequest();
            IFormFileCollection files;
            var rq = Request.GetFormDataRequest(GetUser(), out files);
            var data = await Request.UploadFilesVideo(StoredProcedure.PBH_FILE_VIDEO_NH, (object)rq, files);
            return Ok(data);
        }

        /// <summary>
        /// Sửa tên File video
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> suaTenVideo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_FILE_VIDEO_SUA_TEN, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách hạng mục đánh giá rủi ro theo hồ sơ bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layHangMucDGRR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DGRR_HSBT_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách ảnh thumnail ảnh DGRR và ảnh tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layAnhThumnailDGRRTonThat()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DGRR_THUMNAIL_LKE, json, "/api/esmartclaim/get-thumnail-dgrr");
            return Ok(data);
        }
        /// <summary>
        /// Lấy ảnh chi tiết theo bt
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layFileTheoBT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_FILE_BT, json, "/api/esmartclaim/get-file-bt");
            return Ok(data);
        }
        public IActionResult TransViewsImageDisplay(string so_id, string nv, string hang_muc, string loai, string url_redirect)
        {
            string ho_so = HttpUtility.UrlEncode(Utilities.EncryptByKey(so_id + "/" + nv + "/" + hang_muc + "/" + loai, AppSettings.KeyEryptData));
            return LocalRedirect(url_redirect + "?ho_so=" + ho_so);
        }
    }
}
