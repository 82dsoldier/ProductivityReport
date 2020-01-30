using Microsoft.AspNetCore.Mvc;
using ProductivityReport.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductivityReport.api
{
    [Route("api/[controller]")]
    public class ProductivityReportController : Controller
    {
        private IProductivityReportService _service;

        public ProductivityReportController(IProductivityReportService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetReport() => new JsonResult(_service.GetReport());
    }
}
