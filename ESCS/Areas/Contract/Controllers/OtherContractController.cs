using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ESCS.MODEL.ESCS.ModelView;
using ESCS.COMMON.Http;

namespace ESCS.Areas.Contract.Controllers
{
    [Area("Contract")]
    [SystemAuthen]
    [ESCSDescription(ESCSMethod.GET, "Hợp đồng bảo hiểm khác")]
    public class OtherContractController : BaseController
    {
        [ESCSDescription(ESCSMethod.GET, "Màn hình tìm kiếm/xem thông tin chung")]
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KHAC_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> TimKiemKhachHang()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_LKE, json);
            return Ok(data);
        }
        // lưu hợp đồng
        [AjaxOnly]
        public async Task<JsonResult> hd_nh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KHAC_NH, json);
            return Json(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Lấy chi tiết hợp đồng")]
        [AjaxOnly]
        public async Task<IActionResult> layChiTietHopDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KHAC_GCN_DS_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Lấy danh sách các nhà bảo hiểm")]
        [AjaxOnly]
        public async Task<IActionResult> getListNhaBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NHA_BH_TATCA, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Lấy danh sách loại hình nghiệp vụ")]
        [AjaxOnly]
        public async Task<IActionResult> getListLHNV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_LHNV_KHAC, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Lấy danh sách đồng tái")]
        [AjaxOnly]
        public async Task<IActionResult> getListDongtai()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KHAC_GCN_DS_DONG_TAI_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu danh sách đồng tái")]
        [AjaxOnly]
        public async Task<IActionResult> LuuThongTinDongTai()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DS_DONG_TAI_SAVE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lấy chi tiết đồng tái")]
        [AjaxOnly]
        public async Task<IActionResult> getDetailDongTai()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DONG_TAI_CT, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Xem thông tin chi tiết Email CC")]
        [AjaxOnly]
        public async Task<IActionResult> GetDetailEmail_CC()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_EMAIL_CC_LKE_CT, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lấy tổng phí TPA")]
        [AjaxOnly]
        public async Task<IActionResult> GetTongPhiTpa()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_PHI_TPA_LK, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu phí phát sinh TPA")]
        [AjaxOnly]
        public async Task<IActionResult> TongPhiTpaNhap()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_PHI_TPA_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Xóa phí phát sinh TPA")]
        [AjaxOnly]
        public async Task<IActionResult> xoaTongPhiTpa()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_PHI_TPA_X, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin người được bảo hiểm")]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinGCN()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KHAC_GCN_NH, json);
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
            var dataRQ = JsonConvert.DeserializeObject<data_get_list_file>(json);
            string urlApi = "/api/esmartclaim/get-file-thumnail";
            if (AppSettings.ConnectApiCorePartner && !string.IsNullOrEmpty(dataRQ.pm) && dataRQ.pm == "BH")
                urlApi = "/api/partner/list-file";
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_THUMNAIL, json, urlApi);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lấy danh sách hạng mục bồi thường khác")]
        [AjaxOnly]
        public async Task<IActionResult> layHangMucCache()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_KHAC_HANG_MUC_CACHE, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_PHAN_LOAI, json);
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
            var dataRQ = JsonConvert.DeserializeObject<data_get_list_file>(json);
            string urlApi = "/api/esmartclaim/get-file";
            if (AppSettings.ConnectApiCorePartner && !string.IsNullOrEmpty(dataRQ.pm) && dataRQ.pm == "API")
                urlApi = "/api/partner/get-file";
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_FILE_TAI_FILE, json, urlApi);
            return Json(data);
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
    }
}