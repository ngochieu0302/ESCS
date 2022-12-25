using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using ESCS.MODEL.ESCS;
using RazorEngine.Templating;
using Newtonsoft.Json;
using ESCS.COMMON.Http;
using RazorEngine.Configuration;
using ESCS.Common;
using System.Drawing;
using ESCS.COMMON.OCR;
using ESCS.COMMON.EscsBill;
using ESCS.MODEL.ESCS.ModelView;
using ESCS.MODEL.ESCS.OutValues;
using Newtonsoft.Json.Linq;

namespace ESCS.Areas.HealthClaim.Controllers
{
    [Area("HealthClaim")]
    public class HealthGuaranteeController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Tìm kiếm  + phân trang hồ sơ giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Tìm người được bảo hiểm
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> searchNDBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var urlApi = "/api/esmartclaim/excute";
            if (AppSettings.ConnectApiCorePartnerHealth)
            {
                var dataRQ = JsonConvert.DeserializeObject<bh_bt_hs_ng_hs_params>(json);
                if (dataRQ.tu_ht == "CORE")
                {
                    urlApi = "/api/health/search-policy";
                }
                else
                {
                    urlApi = "/api/esmartclaim/excute";
                }
            }
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TIM_NDBH, json, urlApi);
            return Ok(data);
        }
        /// <summary>
        /// Nhập thông tin người được bảo hiểm
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> insertNDBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_NH, json, "/api/health/create");
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_KH_VIP, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin chi tiết hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> detailNDBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Thêm lần bảo lãnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> insertLanBaoLanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_LAN_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Chuyển người xử lý hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chuyenNguoiXuLy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUYEN_NGUOI_XLY, json);
            return Ok(data);
        }
        /// <summary>
        /// Duyệt lần bảo lãnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> duyetLanBaoLanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            request_duyet rq = JsonConvert.DeserializeObject<request_duyet>(json);
            var data = await Request.GetResponeNew<decimal?>(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_DUYET, json);
            var defineInfo = Request.GetDefineInfo();
            if (data != null && data.state_info != null && data.state_info.status == STATUS_OK)
            {
                EscsUtils.CreateFileAndSendEmail(json, defineInfo, rq.gui_email);
            }
            //#region Code test upload file
            //List<file_uploads> file = new List<file_uploads>();
            //Byte[] bytes = System.IO.File.ReadAllBytes(@"D:\thanh_test.xml");
            //String fileBase64 = Convert.ToBase64String(bytes);
            //file.Add(new file_uploads()
            //{
            //    ma_doi_tac = "CTYBHABC",
            //    loai = "MAU_IN_PDF",
            //    path = @"CTYBHABC\MAU_IN_PDF\thanh_test.xml",
            //    file_base64 = fileBase64
            //});
            //var resUpload = await EscsUtils.UploadFileToPath(file, defineInfo);
            //#endregion
            return Ok(data);
        }
        /// <summary>
        /// Hủy duyệt lần bảo lãnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyDuyetLanBaoLanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_DUYET_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa quyền lợi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaQuyenLoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_QLOI_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Sửa quyền lợi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> editQuyenLoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_LAN_QLOI_SUA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách chứng từ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapChungTu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUNG_TU_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách chứng từ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layChungTu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUNG_TU_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa chứng từ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaChungTu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUNG_TU_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Thêm người thụ hưởng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapThuHuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_THU_HUONG_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa người thụ hưởng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaThuHuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_THU_HUONG_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa người thụ hưởng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> copyLanBaoLanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_COPY, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> chuyenThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUYEN_THANH_TOAN, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> goChuyenThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUYEN_THANH_TOAN_HUY, json);
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
        /// Xóa file ảnh trong hồ sơ giám định
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DeleteImageDamage()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Sửa lần bảo lãnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> editLanBaoLanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_LAN_SUA, json);
            return Ok(data);
        }
        /// <summary>
        /// Xem chi tiết quyền lợi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getCTQuyenLoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_LAN_QLOI_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Chuyển bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> chuyenBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_CHUYEN, json);
            return Ok(data);
        }
        /// <summary>
        /// Phân loại ảnh tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> phanLoaiHangMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_PHAN_HANG_MUC, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách giấy tờ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetDocument()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy thông tin thụ hưởng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layThongTinHThuHuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_THU_HUONG_LAY_TT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy lịch sử tổn thất
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layLSTT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LSTT, json);
            return Ok(data);
        }
        /// <summary>
        /// Thay đổi đối tượng bảo hiểm
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> thayDoiDTBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_DT_UPDATE, json);
            return Ok(data);
        }
        /// <summary>
        /// Thay đổi cơ sở y tế
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> thayDoiCSYT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_UPDATE_CSYT, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_HUY_HS, json);
            return Ok(data);
        }
        /// <summary>
        /// Gỡ hủy hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> goHuyHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_HUY_HS_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Từ chối bảo lãnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> tuChoiBaoLanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_TU_CHOI, json);
            return Ok(data);
        }
        /// <summary>
        /// Gỡ từ chối bảo lãnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> goTuChoiBaoLanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_TU_CHOI_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu chi phí chi tiết quyền lợi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> LuuChiPhiChiTiet()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_QLOI_CHI_PHI_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu liên hệ cơ sở y tế
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> LuuLienHeCSYT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_BENH_VIEN_LHE_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Lưu liên hệ cơ sở y tế
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> ImportLienHeCSYT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_BENH_VIEN_LHE_IMPORT, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách liên hệ cơ sở y tế
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> LayTTLienHeCSYT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_BENH_VIEN_LHE_TKIEM, json);
            return Ok(data);
        }
        /// <summary>
        /// Xóa lần bảo lãnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaLanBaoLanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_LAN_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Copy hồ sơ bảo lãnh
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> copyHoSoBaoLanh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_COPY, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhận hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> NhanHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_BAO_LANH_NHAN, json);
            return Ok(data);
        }
    }
}
