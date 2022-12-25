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

namespace ESCS.Areas.HealthClaim.Controllers
{
    [Area("HealthClaim")]
    public class HealthCompensationController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Tìm kiếm  + phân trang hồ sơ tính toán bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy chi tiết hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> detailHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_LKE_CT, json);
            return Ok(data);
        }
        /// <summary>
        /// Thông tin chi tiết 1 lần tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> detailReceive()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_LAN_CT, json);
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
        /// Lấy tất cả chứng từ bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layChungTuBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUNG_TU_LKE, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUNG_TU_NH, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUNG_TU_XOA, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_THU_HUONG_NH, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_THU_HUONG_XOA, json);
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
        /// Lấy lịch sử tổn thất tổng hợp theo quyền lợi
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layLSTTGroup()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LSTT_GROUP, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy top 5 hợp đồng tái tục
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layDanhSachHDTaiTuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LSTT_TOP_5_HD_TAI_TUC, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy lịch sử tổn thất top 5
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layLSTTTop5()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LSTT_TOP_5, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy lịch sử tổn thất tổng hợp theo quyền lợi Top 5
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layLSTTGroupTop5()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_LSTT_GROUP_TOP_5, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getListQuyenLoiGoc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_QLOI_GOC_XEM, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> NhanHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_NHAN, json);
            return Ok(data);
        }

        /// <summary>
        /// Lấy danh sách quyền lợi gốc
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> TraHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_TRA, json);
            return Ok(data);
        }
        /// <summary>
        /// Duyệt phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> duyetPA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            request_duyet rq = JsonConvert.DeserializeObject<request_duyet>(json);
            var data = await Request.GetResponeNew<decimal?, out_value_phe_duyet>(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_DUYET, json);
            var defineInfo = Request.GetDefineInfo();
            if (data != null && data.state_info != null && data.state_info.status == STATUS_OK)
            {
                EscsUtils.CreateFileAndSendEmail(json, defineInfo, rq.gui_email);
            }
            return Ok(data);
        }
        /// <summary>
        /// Hủy duyệt phương án
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyDuyetPA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_DUYET_HUY, json);
            return Ok(data);
        }
        /// <summary>
        /// Từ chối bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> TuChoiBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_TU_CHOI, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy từ chối bồi thường
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> HuyTuChoiBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_TU_CHOI_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// Thêm lần tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> themLanTinhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_QLOI_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Thêm lần tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xoaQuyenLoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_QLOI_XOA, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUYEN_THANH_TOAN, json);
            return Ok(data);
        }
        /// <summary>
        /// Gỡ chuyển thanh toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> goChuyenThanhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_CHUYEN_THANH_TOAN_HUY, json);
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
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_QLOI_CHI_PHI_NH, json);
            return Ok(data);
        }
        /// <summary>
        /// Copy hồ sơ
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> copyHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_COPY, json);
            return Ok(data);
        }
        /// <summary>
        /// Hủy hồ sơ tính toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> huyHoSoTinhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_HUY_HS, json);
            return Ok(data);
        }
        /// <summary>
        /// gỡ hủy hồ sơ tính toán
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> goHuyHoSoTinhToan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_HUY_HS_XOA, json);
            return Ok(data);
        }
        /// <summary>
        /// sửa hồ sơ tiếp nhận
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> suaHoSoTiepNhanLan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_HS_TINH_TOAN_UPDATE_TN, json);
            return Ok(data);
        }
        /// <summary>
        /// Xác nhận khách hàng đã ký tay
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> xacNhanKyTay()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_KH_XAC_NHAN_NG_KY_TAY, json);
            return Ok(data);
        }
        /// <summary>
        /// Xem quyền lợi từ HT MIC
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> getListQuyenLoiMIC()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_QLOI_MIC_XEM, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy lịch sử yêu cầu bổ sung HSGT
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> layLichSuYeuCauBSHS()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_NSD_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Nhập thông tin phản hồi ý kiến khách hàng
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> nhapThongTinPhanHoiYKien()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HS_Y_KIEN_KH_NH, json);
            return Ok(data);
        }
    }
}
