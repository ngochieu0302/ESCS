using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using ESCS.Attributes;
using ESCS.COMMON.Http;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Admin.Controllers
{
    [Area("Admin")]
    [SystemAuthen]
    public class HomeController : BaseController
    {
        [NoneMenu]
        public IActionResult Index()
        {
            return View();
        }
    }
}