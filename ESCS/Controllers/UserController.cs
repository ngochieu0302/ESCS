using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.Attributes;
using ESCS.COMMON.Response;
using Microsoft.AspNetCore.Mvc;
using ESCS.COMMON.Common;

namespace ESCS.Controllers
{
    [SystemAuthen]
    public class UserController : BaseController
    {
        public IActionResult Get()
        {
            BaseResponse<escs_nguoi_dung> res = new BaseResponse<escs_nguoi_dung>();
            res.data_info = GetUser();
            return Ok(res);
        }
    }
}
