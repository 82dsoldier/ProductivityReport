﻿using Microsoft.AspNetCore.Mvc;
using ProductivityReport.Base;
using ProductivityReport.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductivityReport.api
{
    [Route("api/[controller]")]
    public class ConversationsController : ApiControllerBase<IConversationService, Conversation>
    {
        public ConversationsController(IConversationService dataService) : base(dataService)
        {
        }

        [HttpGet("GetWebsites")]
        public IActionResult GetWebsites() => new JsonResult(_dataService.GetWebsites());
    }
}
