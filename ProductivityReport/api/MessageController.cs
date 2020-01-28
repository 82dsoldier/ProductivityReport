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
    public class MessageController : ApiControllerBase<IMessageService, Message>
    {
        public MessageController(IMessageService dataService) : base(dataService)
        {
        }
    }
}
