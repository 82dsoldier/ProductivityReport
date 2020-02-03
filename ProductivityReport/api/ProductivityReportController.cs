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
#pragma warning disable IDE0052 // Remove unread private members
        private readonly IProductivityReportService _service;
#pragma warning restore IDE0052 // Remove unread private members

        public ProductivityReportController(IProductivityReportService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetReport([FromQuery]DateTime? startDate, [FromQuery]DateTime? endDate, string webSite, string device) => new JsonResult(_service.GetReport(startDate, endDate, webSite, device));
    }
}
