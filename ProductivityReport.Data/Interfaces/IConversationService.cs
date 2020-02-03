using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data
{
    public interface IConversationService : IServiceBase<Conversation>
    {
        IEnumerable<string> GetWebsites();
    }
}
