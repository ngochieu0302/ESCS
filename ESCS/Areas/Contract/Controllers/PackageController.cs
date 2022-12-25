using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Contract.Controllers
{
    [Area("Contract")]
    public class PackageController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Liệt kê danh sách gói bảo hiểm
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> Paging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_LKE, json);
            return Ok(data);
        }
        /// <summary>
        /// Lấy danh sách quyền lợi tree
        /// </summary>
        /// <returns></returns>
        [AjaxOnly]
        public async Task<IActionResult> DanhSachQuyenLoiTree()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_LHNV_CN_CT_TREE, json);
            return Ok(data);
        }



        [AjaxOnly]
        public async Task<IActionResult> PageLoad()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_DM_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> Save()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_NH, json);
            return Json(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> delete()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_XOA, json);
            return Json(data);
        }
        
        [AjaxOnly]
        public async Task<IActionResult> Detail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_LKE_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layChiTietGoiTheoMa()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_MA_LKE_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> SaveQL()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_TIEN_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAllQLBS()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_MA_LHNV_CN_CT_DKBS_CACHE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> luuDkbsGoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_DKBS_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> xoaDkbsGoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_DKBS_X, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getDkbsGoi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_DKBS_LK, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu thông tin tỷ lệ đồng - thời gian chờ")]
        [AjaxOnly]
        public async Task<IActionResult> luuTyLeDong()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_CAU_HINH_BV_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Xóa cấu hình mã bệnh (Tỷ lệ đồng - thời gian chờ)")]
        [AjaxOnly]
        public async Task<IActionResult> xoaCauHinhMaBenh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_CAU_HINH_MA_BENH_X, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Import excel quyền lợi gói")]
        [AjaxOnly]
        public async Task<IActionResult> SaveDataExcel()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_CT_IMPORT_EXCEL, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lưu ghi chú khác")]
        [AjaxOnly]
        public async Task<IActionResult> LuuGhiChuKhac()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_GHI_CHU_KHAC_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Lấy danh sách nhóm gói bảo hiểm")]
        [AjaxOnly]
        public async Task<IActionResult> LayDanhSachNhomGoiBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_NHOM_CACHE, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Luu nhóm gói bảo hiểm")]
        [AjaxOnly]
        public async Task<IActionResult> LuuNhomGoiBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_NHOM_NH, json);
            return Ok(data);
        }
        [ESCSDescription(ESCSMethod.POST, "Xóa nhóm gói bảo hiểm")]
        [AjaxOnly]
        public async Task<IActionResult> xoaNhomGoiBH()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_NG_NGUOI_GOI_BH_NHOM_X, json);
            return Ok(data);
        }
    }
}
