using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class CarConfigurationController : BaseController
    {
        #region Phương pháp tính khấu hao
        public IActionResult Index()
        {
            return View();
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SavePhuongPhapKhauHao()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_KHAU_HAO_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveLoaiXe()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_KHAU_HAO_LOAI_XE_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveNgayKhauHao()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_KHAU_HAO_NGAY_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_KHAU_HAO_X, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_KHAU_HAO_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_KHAU_HAO_LKE_CT, json);
            return Ok(data);
        }
        #endregion

        #region Phương pháp tính giảm trừ - giảm trừ dkbs (Reduce)
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveReduce()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_GIAM_TRU_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetailReduce()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_GIAM_TRU_LKE_CT, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình chung
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveCauHinhBT()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetailCar()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_LKE_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDsNgay()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_CAU_HINH_LKE_NGAY, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> deleteConfigKhauHao()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_KHAU_HAO_X, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> deleteConfigKhauHaoLoaiXe()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_KHAU_HAO_LOAI_XE_X, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> deleteConfigGiamTru()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_XE_GIAM_TRU_X, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> deleteConfigCommonCar()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_X, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình bồi thường
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuCauHinhBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_BOI_THUONG_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xemCauHinhBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_BOI_THUONG_LKE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> xoaCauHinhBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_BOI_THUONG_X, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình hồ sơ chứng từ
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinHoSoChungTu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_CAU_HINH_NHAP, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xemCauHinhHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_CAU_HINH_LKE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> xoaCauHinhHoSo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_HO_SO_GIAY_TO_CAU_HINH_XOA, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình KPI
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinTienTrinhKPI()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEN_TRINH_XE_KPI_NHAP, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> xoaThongTinTienTrinhKPI()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEN_TRINH_XE_KPI_XOA, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xemThongTinChiTietNgayTien()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEN_TRINH_XE_KPI_LKE_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layThongTinChiTietKPI()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_TIEN_TRINH_XE_KPI_LKE_CT, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình SLA
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinCauHinhSLA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_SLA_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> lietKeThongTinCauHinhSLA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_SLA_LKE_CT, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình phân công theo địa bàn
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinPhanCong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_PHAN_CONG_DIA_BAN_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> lietKeThongTinPhanCongDiaBan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_PHAN_CONG_DIA_BAN_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layChiTietThongTinPhanCongDiaBan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_PHAN_CONG_DIA_BAN_LKE_LKE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> xoaThongTinPhanCongDiaBan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_PHAN_CONG_DIA_BAN_X, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layThongTinChiTietPhanCongDiaBan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_PHAN_CONG_DIA_BAN_LKE_CT, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình duyệt giá tự động
        [AjaxOnly]
        public async Task<IActionResult> layDsNgayADDuyetGiaTuDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_GIA_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layChiTietCHDuyetGiaTuDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_GIA_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuCHDuyetGiaTuDongNgayAD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_GIA_NGAY_AD_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuCHDuyetGiaDanhMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_GIA_DANH_MUC_NH, json);
            return Ok(data);
        }

        [AjaxOnly]
        public async Task<IActionResult> layHangHieuXeCHDG()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_GIA_HANG_HIEU_XE_LKE, json);
            return Ok(data);
        }

        [AjaxOnly]
        public async Task<IActionResult> layDSHangMucCHDGNhap()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_GIA_HANG_MUC_NH_LKE, json);
            return Ok(data);
        }

        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuDuLieuHangMucCHDGNhap()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_GIA_HANG_MUC_NH, json);
            return Ok(data);
        }

        [AjaxOnly]
        public async Task<IActionResult> timKiemDsCauHinhDuyetGia()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_GIA_HANG_MUC_NH_TKIEM, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình bên tham gia giám định mặc định
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinCHBenGDMD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_CH_BEN_THAM_GIA_GD_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> lietKeThongTinCHBenGDMD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_CH_BEN_THAM_GIA_GD_LKE, json);
            return Ok(data);
        }
        #endregion

        #region Cấu hình xử lý hồ sơ
        [AjaxOnly]
        public async Task<IActionResult> lietKeCauHinhXyLyBoiThuong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_XLY_LKE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinCauHinhXuLy()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_XLY_NH, json);
            return Ok(data);
        }
        #endregion
    }
}