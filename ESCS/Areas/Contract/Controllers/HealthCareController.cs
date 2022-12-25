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

namespace ESCS.Areas.Contract.Controllers
{
    [Area("Contract")]
    [SystemAuthen]
    [ESCSDescription(ESCSMethod.GET, "Hợp đồng bảo hiểm sức khỏe con người")]
    public class HealthCareController : BaseController
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin khách hàng")]
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> TimKiemKhachHang()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Liệt kê danh sách hồ sơ khách hàng")]
        [AjaxOnly]
        public async Task<IActionResult> layChiTietHopDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DS_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Liệt kê danh sách hồ sơ khách hàng")]
        [AjaxOnly]
        public async Task<IActionResult> getListLHNV()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PKH_BH_NG_NHLV, json);
            return Ok(data);
        }

        [ESCSDescription(ESCSMethod.GET, "Lấy danh sách gói bảo hiểm")]
        [AjaxOnly]
        public async Task<IActionResult> getDsGoiBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PKH_BH_NG_GOI_BH, json);
            return Ok(data);
        }
        // lưu hợp đồng
        [AjaxOnly]
        public async Task<JsonResult> hd_nh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_HD_NH, json);
            return Json(data);
        }
        // Lưu khách hàng
        [AjaxOnly]
        public async Task<JsonResult> luuThongTinGCN()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DS_NH, json);
            return Json(data);
        }
        // Lấy quyền lợi gói bảo hiểm đồng tái
        [AjaxOnly]
        public async Task<JsonResult> LayQuyenLoiGoiBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DS_QL_LKE, json);
            return Json(data);
        }
        // Lấy quyền lợi điều khoản bổ sung của gcn
        [AjaxOnly]
        public async Task<JsonResult> LayDKBSGCN()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NGUOI_DS_DKBS_LKE, json);
            return Json(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin Email CC")]
        [AjaxOnly]
        public async Task<IActionResult> SaveEmail_CC()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_EMAIL_CC_NH, json);
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
        [ESCSDescription(ESCSMethod.DELETE, "Xóa thông tin Email CC")]
        [AjaxOnly]
        public async Task<IActionResult> DeleteEmailCC()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_EMAIL_CC_LKE_X, json);
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
        [ESCSDescription(ESCSMethod.GET, "Lấy danh sách đồng tái")]
        [AjaxOnly]
        public async Task<IActionResult> getListDongtai()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DS_DONG_TAI_LKE, json);
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
        [ESCSDescription(ESCSMethod.DELETE, "Xóa đồng tái")]
        [AjaxOnly]
        public async Task<IActionResult> XoaDongTai()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DONG_TAI_DELETE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin import excel")]
        [AjaxOnly]
        public async Task<IActionResult> SaveDataExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_HD_NG_GCN_IMPORT_EXCEL, json);
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
        [ESCSDescription(ESCSMethod.POST, "Lấy tổng phí TPA")]
        [AjaxOnly]
        public async Task<IActionResult> GetTongPhiTpa()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_PHI_TPA_LK, json);
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
        [ESCSDescription(ESCSMethod.POST, "Xóa phí phát sinh TPA")]
        [AjaxOnly]
        public async Task<IActionResult> GetLisMappingDoiTuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NGUOI_DS_MAPPING_EXCEL, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Xóa phí phát sinh TPA")]
        [AjaxOnly]
        public async Task<IActionResult> UpdateMappingDoiTuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NGUOI_DS_MAPPING_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Sửa thông tin giấy chứng nhận")]
        [AjaxOnly]
        public async Task<IActionResult> LuuSuaGCN()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_UPDATE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Hủy duyệt hợp đồng")]
        [AjaxOnly]
        public async Task<IActionResult> huyDuyetHD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_HUY_DUYET, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getPagingKyThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KY_THANH_TOAN_LKE_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getDetailKyThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KY_THANH_TOAN_LKE_LKE_CT, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Nhập thông tin kỳ thanh toán")]
        [AjaxOnly]
        public async Task<IActionResult> nhapThongTinKyThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KY_THANH_TOAN_NH_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xoaThongTinKyThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KY_THANH_TOAN_XOA, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachNDBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NGUOI_DS_LKE, json);
            return Ok(data);
        }
    }
}