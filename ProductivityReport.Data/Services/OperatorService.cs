using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProductivityReport.Data
{
    public class OperatorService : ServiceBase<Operator>, IOperatorService
    {
        public OperatorService(ProductivityReportContext context) : base(context)
        {
        }

        public override Operator Get(int id) => _context.Operators.First(a => a.OperatorID == id);
    }
}
