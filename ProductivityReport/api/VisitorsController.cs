using Microsoft.AspNetCore.Mvc;
using ProductivityReport.Base;
using ProductivityReport.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductivityReport.api
{
    [Route("api/[controller]")]
    public class VisitorsController : ApiControllerBase<IVisitorService, Visitor>
    {
        public VisitorsController(IVisitorService dataService) : base(dataService)
        {
        }

        [HttpGet("GetDevices")]
        public IActionResult GetDevices() => new JsonResult(_dataService.GetDevices());
    }
}
