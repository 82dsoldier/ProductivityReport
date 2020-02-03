using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProductivityReport.Data
{
    public class ConversationService : ServiceBase<Conversation>, IConversationService
    {
        public ConversationService(ProductivityReportContext context) : base(context)
        {
        }

        public override Conversation Get(int id) => _context.Conversations.First(a => a.ConversationID == id);

        public IEnumerable<string> GetWebsites() => _context.Conversations.GroupBy(a => a.Website).Select(b => b.FirstOrDefault()).Select(c => c.Website);
    }
}
