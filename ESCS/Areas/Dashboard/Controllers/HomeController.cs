using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ESCS.Attributes;
using ESCS.COMMON.ESCSStoredProcedures;
using ESCS.COMMON.ExtensionMethods;
using ESCS.Controllers;
using Microsoft.AspNetCore.Mvc;

namespace ESCS.Areas.Dashboard.Controllers
{
    [Area("Dashboard")]
    [SystemAuthen]
    public class HomeController : BaseController
    {
        [NoneMenu]
        public IActionResult Index()
        {
            return View();
        }
        [SystemAuthen]
        [NoneMenu]
        public IActionResult CarDbAnalysis1()
        {
            return View();
        }
        [SystemAuthen]
        [NoneMenu]
        public IActionResult CarDbAnalysis2()
        {
            return View();
        }

        [SystemAuthen]
        [NoneMenu]
        public IActionResult CarDbAnalysis3()
        {
            return View();
        }

        [SystemAuthen]
        [NoneMenu]
        public IActionResult HealthDbAnalysis1()
        {
            return View();
        }

        [SystemAuthen]
        [NoneMenu]
        public IActionResult HealthDbAnalysis2()
        {
            return View();
        }

        [SystemAuthen]
        [NoneMenu]
        public IActionResult HealthDbAnalysis3()
        {
            return View();
        }
    }
}