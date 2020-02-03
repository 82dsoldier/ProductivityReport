using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data
{
    public interface IVisitorService : IServiceBase<Visitor>
    {
        IEnumerable<string> GetDevices();
    }
}
