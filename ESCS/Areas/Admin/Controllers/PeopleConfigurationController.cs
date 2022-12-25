using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class PeopleConfigurationController : BaseController
    {
        #region Cấu hình bồi thường con người
        public IActionResult Index()
        {
            return View();
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuCauHinhBoiThuongConNguoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_BOI_THUONG_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xemCauHinhBoiThuongConNguoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_BOI_THUONG_LKE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> xoaCauHinhBoiThuongConNguoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_CAU_HINH_BOI_THUONG_X, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDsNgayADDuyetBoiThuongTuDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_NG_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layChiTietCHDuyetBoiThuongTuDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_NG_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuCHDuyetBoiThuongTuDongNgayAD()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_NG_NGAY_AD_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDanhMucQuyenLoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_LHNV_CN_CT_TREE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuCHDuyetBoiThuongDanhMuc()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_DUYET_NG_DANH_MUC_NH, json);
            return Ok(data);
        }
        #endregion
        #region Cấu hình SLA
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinCauHinhSLA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_SLA_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> lietKeThongTinCauHinhSLA()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_NG_SLA_LKE_CT, json);
            return Ok(data);
        }
        #endregion
    }
}
