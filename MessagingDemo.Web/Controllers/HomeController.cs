using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using MessagingDemo.Web.Models;
using MessagingDemo.Data;
using MessagingDemo.Data.Models;
using Microsoft.EntityFrameworkCore;

namespace MessagingDemo.Web.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly DemoDbContext demoDbContext;

        public HomeController(ILogger<HomeController> logger, DemoDbContext demoDbContext)
        {
            _logger = logger;
            this.demoDbContext = demoDbContext;
        }

        public async Task<IActionResult> Index()
        {
            return View();
        }
    }
}
