using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.Common;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.Response;
using System.Text.RegularExpressions;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class UserManagementController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAll()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_NSD_CACHE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAllCanBo()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_NSD_QUYEN_CACHE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetAllRole()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_NSD_QUYEN_LKE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var rq = Request.GetDataRequest(GetUser());
            if (rq.mat_khau != null && !string.IsNullOrEmpty(rq.mat_khau.ToString()))
            {
                string pas = rq.mat_khau.ToString();
                BaseResponse<string> resError = new BaseResponse<string>();
                resError.state_info.status = STATUS_NOTOK;
                resError.state_info.message_code = "500";
                resError.state_info.message_body = @"Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt ([@#!$^&*%./\|])";
                if (pas.Length < 8)
                    return Ok(resError);
                var regexItem1 = new Regex("[a-z]");
                var regexItem2 = new Regex("[A-Z]");
                var regexItem3 = new Regex("[0-9]");
                var regexItem4 = new Regex(@"[[@#!$^&*%./\|\]]");
                if (!regexItem1.IsMatch(pas)|| !regexItem2.IsMatch(pas)|| !regexItem3.IsMatch(pas) || !regexItem4.IsMatch(pas))
                    return Ok(resError);

                rq.mat_khau = Utilities.Sha256Hash(rq.mat_khau.ToString());
            }
            else
            {
                rq.mat_khau = "";
            }    
            var data = await Request.GetRespone(StoredProcedure.PHT_NSD_NH, (object)rq);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PHT_NSD_LKE, (object)rq);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> GetDetail()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PHT_NSD_LKE_CT, (object)rq);
            return Json(data);
        }
        [AjaxOnly]
        public async Task<JsonResult> GetLocalityInspection()
        {
            var rq = Request.GetDataRequest(GetUser());
            var data = await Request.GetRespone(StoredProcedure.PBH_BT_XE_DIA_BAN_GD_LKE, (object)rq);
            return Json(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveLocalityInspection()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_XE_DIA_BAN_GD_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> SaveDecentralization()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHAN_CAP_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuPhanCapNhomPC()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_PC_NSD_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDecentralization()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHAN_CAP_LKE_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layPhanCapNhomPC()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_PC_NSD_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> KhoaTaiKhoan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_NSD_TRANG_THAI, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> MoKhoaTaiKhoan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_NSD_TRANG_THAI, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> XoaTaiKhoan()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_NSD_TRANG_THAI, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDSCanBoTheoDonVi()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_NSD_CNHANH_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDSNgay()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHAN_CAP_LKE_NGAY, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layDSNgayNhomPC()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_PC_NSD_LKE_NGAY, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuPhanCapNgay()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHAN_CAP_NGAY_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuPhanCapNgayNhomPC()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_PC_NSD_NGAY_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getDetailPhanCapNgay()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHAN_CAP_NGAY_LKE_CT, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> getDetailPhanCapNgayNhomPC()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_PC_NSD_NGAY_LKE_CT, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> deletePhanCapNgay()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHAN_CAP_NGAY_X, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> copyPhanCapNgay()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHAN_CAP_COPY, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuPhanCapChung()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHAN_CAP_TAM_UNG_THANH_TOAN_NH, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuThongTinPhanCapChungNhomPC()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_PC_NSD_TAM_UNG_THANH_TOAN_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> phanCapChung()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_BT_PHAN_CAP_TAM_UNG_THANH_TOAN_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layNhomQuyen()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_QUYEN_NSD_CACHE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuNhomQuyenCauHinh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_QUYEN_NSD_NH, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> layNhomPhanCap()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_PC_NSD_CACHE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> luuNhomPCCauHinh()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_PC_NSD_CACHE, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> xoaNhomQuyen()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_CAU_HINH_NHOM_QUYEN_NSD_XOA, json);
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> importExcelDanhSachNsd()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PHT_NSD_IMPORT_EXCEL, json);
            return Ok(data);
        }
    }
}
