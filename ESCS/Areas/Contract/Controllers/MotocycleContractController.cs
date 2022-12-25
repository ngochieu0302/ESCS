//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using ESCS.COMMON.Common;
//using ESCS.COMMON.ESCSStoredProcedures;
//using ESCS.COMMON.ExtensionMethods;
//using ESCS.Attributes;
//using ESCS.Controllers;
//using Microsoft.AspNetCore.Mvc;

//namespace ESCS.Areas.Contract.Controllers
//{
//    [Area("Contract")]
//    [SystemAuthen]
//    [ESCSDescription(ESCSMethod.GET, "Hợp đồng bảo hiểm xe máy")]
//    public class MotorcycleContractController : BaseController
//    {
//        [ESCSDescription(ESCSMethod.GET, "Màn hình tìm kiếm/xem thông tin chung")]
//        public IActionResult Index()
//        {
//            return View();
//        }
//        [ESCSDescription(ESCSMethod.GET, "Màn hình tìm kiếm xe máy")]
//        [AjaxOnly]
//        public async Task<IActionResult> GetPaging()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_MAY_GCN_LKE, json);
//            return Ok(data);
//        }
//        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin khách hàng")]
//        [AjaxOnly]
//        public async Task<IActionResult> Save()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_NH, json);
//            return Ok(data);
//        }
//        [ESCSDescription(ESCSMethod.GET, "Liệt kê danh sách xe máy hồ sơ khách hàng")]
//        [AjaxOnly]
//        public async Task<IActionResult> layChiTietHopDong()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_MAY_GCN_DS_LKE, json);
//            return Ok(data);
//        }
//        [ESCSDescription(ESCSMethod.GET, "Liệt kê đồng tái")]
//        [AjaxOnly]
//        public async Task<IActionResult> GetPagingXe_dong_tai()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_DONG_TAI_BH_LKE, json);
//            return Ok(data);
//        }
//        // lưu hợp đồng
//        [AjaxOnly]
//        public async Task<JsonResult> hd_nh()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_MAY_GCN_HD_NH, json);
//            return Json(data);
//        }
//        // Lưu khách hàng
//        [AjaxOnly]
//        public async Task<JsonResult> kh_nh()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_NH, json);
//            return Json(data);
//        }
//        // Lấy chi tiết khách hàng
//        [AjaxOnly]
//        public async Task<IActionResult> kh_detail()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_DETAIL, json);
//            return Ok(data);
//        }
//        // Lấy chi tiết xe
//        [AjaxOnly]
//        public async Task<IActionResult> xe_detail()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_MAY_GCN_LKE_CT, json);
//            return Ok(data);
//        }
//        [AjaxOnly]
//        public async Task<IActionResult> TimKiemKhachHang()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_LKE, json);
//            return Ok(data);
//        }
//        [AjaxOnly]
//        public async Task<IActionResult> LuuThongTinGCN()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_MAY_GCN_DS_NH, json);
//            return Ok(data);
//        }
//        [AjaxOnly]
//        public async Task<IActionResult> LuuThongTinDKBS()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_DKBS_NH, json);
//            return Ok(data);
//        }
//        // Lấy danh sách các nhà BH
//        [ESCSDescription(ESCSMethod.GET, "Lấy danh sách các nhà bảo hiểm")]
//        [AjaxOnly]
//        public async Task<IActionResult> getListNhaBH()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_NHA_BH_TATCA, json);
//            return Ok(data);
//        }
//        // Lấy quyền lợi gói bảo hiểm đồng tái
//        [AjaxOnly]
//        public async Task<JsonResult> LayQuyenLoiGoiBH()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DS_QL_LKE, json);
//            return Json(data);
//        }
//        // Lưu thông tin đồng tái
//        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin đồng tái")]
//        [AjaxOnly]
//        public async Task<IActionResult> LuuThongTinDongTai()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DS_DONG_TAI_SAVE, json);
//            return Ok(data);
//        }
//        [ESCSDescription(ESCSMethod.GET, "Lấy danh sách đồng tái")]
//        [AjaxOnly]
//        public async Task<IActionResult> getListDongtai()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DS_DONG_TAI_LKE, json);
//            return Ok(data);
//        }
//        [ESCSDescription(ESCSMethod.POST, "Lấy chi tiết đồng tái")]
//        [AjaxOnly]
//        public async Task<IActionResult> getDetailDongTai()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DONG_TAI_CT, json);
//            return Ok(data);
//        }
//        [ESCSDescription(ESCSMethod.DELETE, "Xóa đồng tái")]
//        [AjaxOnly]
//        public async Task<IActionResult> XoaDongTai()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DONG_TAI_DELETE, json);
//            return Ok(data);
//        }
//        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin import excel xe")]
//        [AjaxOnly]
//        public async Task<IActionResult> SaveDataExcel()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_HD_XE_GCN_IMPORT_EXCEL, json);
//            return Ok(data);
//        }
//        /// <summary>
//        /// Phân loại ảnh tổn thất
//        /// </summary>
//        /// <returns></returns>
//        [AjaxOnly]
//        public async Task<IActionResult> phanLoaiHangMuc()
//        {
//            var json = Request.GetDataRequestNew(GetUser());
//            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_PHAN_LOAI, json);
//            return Ok(data);
//        }
//    }
//}