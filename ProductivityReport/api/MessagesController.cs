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
    public class MessagesController : ApiControllerBase<IMessageService, Message>
    {
        public MessagesController(IMessageService dataService) : base(dataService)
        {
        }
    }
}
