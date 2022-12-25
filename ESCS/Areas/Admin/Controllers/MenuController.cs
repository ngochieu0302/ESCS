using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Attributes;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;
using ESCS.Common;
using ESCS.MODEL.ESCS.ModelView;
using Newtonsoft.Json;
using ESCS.COMMON.Response;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class MenuController : BaseController
    {
        public IActionResult Index()
        {
            return View();
        }
        [AjaxOnly]
        public async Task<IActionResult> PageLoad()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MA_DOI_TAC_CACHE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetListParentMenu()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MENU_CHA, json);
           
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Save()
        {
            var user = GetUser();
            var json = Request.GetDataRequestNew(user);
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MENU_NH, json);
            var res_json = JsonConvert.SerializeObject(data);
            BaseResponse<int, out_value> res = JsonConvert.DeserializeObject<BaseResponse<int, out_value>>(res_json);
            if (res.state_info.status=="OK")
            {
                escs_menu menu_item = JsonConvert.DeserializeObject<escs_menu>(json);
                menu_item.so_id = res.out_value.so_id;
                menu_item.stt = res.out_value.stt;
                menu_item.so_id_cha = menu_item.so_id_cha ?? 0;
                var list_menu = EscsUtils.GetMenu(user.ma_doi_tac + "/" + user.nsd).ToList();
                list_menu.RemoveAll(n => n.so_id == menu_item.so_id);
                list_menu.Add(menu_item);
                EscsUtils.SaveUserMenu(user.ma_doi_tac + "/" + user.nsd, list_menu);
            }
            else
            {
                return Ok(data);
            }    
            return Ok(data);
        }
        [ESCSLog]
        [AjaxOnly]
        public async Task<IActionResult> Delete()
        {
            var user = GetUser();
            var json = Request.GetDataRequestNew(user);
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MENU_XOA, json);
            var res_json = JsonConvert.SerializeObject(data);
            BaseResponse<int, out_value> res = JsonConvert.DeserializeObject<BaseResponse<int, out_value>>(res_json);
            if (res.state_info.status == "OK")
            {
                escs_menu menu_item = JsonConvert.DeserializeObject<escs_menu>(json);
                var list_menu = EscsUtils.GetMenu(user.ma_doi_tac + "/" + user.nsd).ToList();
                list_menu.RemoveAll(n => n.so_id == menu_item.so_id);
                EscsUtils.SaveUserMenu(user.ma_doi_tac + "/" + user.nsd, list_menu);
            }

            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetPaging()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MENU_LKE, json);
            return Ok(data);
        }
        [AjaxOnly]
        public async Task<IActionResult> GetDetail()
        {
            var json = Request.GetDataRequestNew(GetUser());
            var data = await Request.GetResponeNew(StoredProcedure.PBH_HT_MENU_LKE_CT, json);
            return Ok(data);
        }
    }
}