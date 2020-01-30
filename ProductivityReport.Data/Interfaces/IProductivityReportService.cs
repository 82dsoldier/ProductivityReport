using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data
{
    public interface IProductivityReportService
    {
        IEnumerable<ProductivityReportLine> GetReport();
    }
}
