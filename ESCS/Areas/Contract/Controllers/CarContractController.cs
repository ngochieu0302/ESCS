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
using ESCS.MODEL.ESCS;
using ESCS.COMMON.Response;

namespace ESCS.Areas.Contract.Controllers
{
    [Area("Contract")]
    [SystemAuthen]
    [ESCSDescription(ESCSMethod.GET, "Hợp đồng bảo hiểm xe ô tô")]
    public class CarContractController : BaseController
    {
        [ESCSDescription(ESCSMethod.GET, "Màn hình tìm kiếm/xem thông tin chung")]
        public IActionResult Index()
        {
            return View();
        }
        [ESCSDescription(ESCSMethod.GET, "Màn hình tìm kiếm xe cơ giới")]
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_LKE, json);
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
        [ESCSDescription(ESCSMethod.GET, "Liệt kê danh sách hồ sơ khách hàng")]
        [AjaxOnly]
        public async Task<IActionResult> layChiTietHopDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DS_LKE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Liệt kê đồng tái")]
        [AjaxOnly]
        public async Task<IActionResult> GetPagingXe_dong_tai()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_DONG_TAI_BH_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> hd_nh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_HD_NH, json, "/api/contract/create-qrcode");
            return Json(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> kh_nh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_NH, json);
            return Json(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> kh_detail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_DETAIL, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xe_detail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_LKE_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> TimKiemKhachHang()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_KH_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> LuuThongTinGCN()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DS_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> LuuThongTinDKBS()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_DKBS_NH, json);
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
        [AjaxOnly]
        public async Task<JsonResult> LayQuyenLoiGoiBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DS_QL_LKE, json);
            return Json(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin đồng tái")]
        [AjaxOnly]
        public async Task<IActionResult> LuuThongTinDongTai()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_NG_GCN_DS_DONG_TAI_SAVE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.GET, "Lấy danh sách đồng tái")]
        [AjaxOnly]
        public async Task<IActionResult> getListDongtai()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DS_DONG_TAI_LKE, json);
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
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin import excel xe")]
        [AjaxOnly]
        public async Task<IActionResult> SaveDataExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_BH_HD_XE_GCN_IMPORT_EXCEL, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> phanLoaiHangMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_PHAN_LOAI, json);
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
        public async Task<IActionResult> GetQRCodeHopDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            string urlApi = "/api/contract/get-qrcode";
            BaseResponse<object, bh_hd_qrcode> data = await Request.GetResponeNew<object, bh_hd_qrcode>(StoredProcedure.PBH_HD_QRCODE_LKE_CT, json, urlApi);
            if (data != null && data.state_info != null && data.state_info.status == STATUS_NOTOK)
            {
                var rqSave = await Request.GetResponeNew(StoredProcedure.PBH_HD_QRCODE_LKE_CT, json, "/api/contract/create-qrcode");
                data = await Request.GetResponeNew<object, bh_hd_qrcode>(StoredProcedure.PBH_HD_QRCODE_LKE_CT, json, urlApi);
            }
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lấy thông tin chi tiết hạng mục AI")]
        [AjaxOnly]
        public async Task<IActionResult> layThongTinDanhGiaHangMucAI()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_HANG_MUC_LKE, json);
            return Ok(data);
        }
        /// <summary>
        ///Lưu đánh giá hạng mục chi tiết AI
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> luuDanhGiaHangMucAI()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_HANG_MUC_NH, json);
            return Ok(data);
        }
        /// <summary>
        ///Lưu đánh giá hạng mục sơ bộ
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> luuDanhGiaHangMucSoBo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DGRR_CT_NH, json);
            return Ok(data);
        }
        /// <summary>
        ///Xác nhận lần đánh giá rủi ro
        /// </summary>
        /// <returns></returns>
        public async Task<IActionResult> xacNhanLanDGRR()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HD_XE_GCN_DGRR_LAN_XAC_NHAN, json);
            return Ok(data);
        }
    }
}