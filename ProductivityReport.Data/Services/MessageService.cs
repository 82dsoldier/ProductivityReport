using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProductivityReport.Data
{
    public class MessageService : ServiceBase<Message>, IMessageService
    {
        public MessageService(ProductivityReportContext context) : base(context)
        {
        }

        public override Message Get(int id) => _context.Messages.First(a => a.MessageID == id);
    }
}
