using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProductivityReport.Data
{
    public class VisitorService : ServiceBase<Visitor>, IVisitorService
    {
        public VisitorService(ProductivityReportContext context) : base(context)
        {
        }

        public override Visitor Get(int id) => _context.Visitors.First(a => a.VisitorID == id);

        public IEnumerable<string> GetDevices() => _context.Visitors.GroupBy(a => a.Device).Select(b => b.First()).Select(c => c.Device);
    }
}
