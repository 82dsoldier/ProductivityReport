using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data
{
    public class ProductivityReportService : IProductivityReportService
    {
        private ProductivityReportContext _context;
        public ProductivityReportService(ProductivityReportContext context)
        {
            _context = context;
        }

        public IEnumerable<ProductivityReportLine> GetReport()
        {
            var entries = _context.ProductivityReportView;
            var retVal = new List<ProductivityReportLine>();
            foreach (var entry in entries)
                yield return new ProductivityReportLine
                {
                    Name = entry.Name,
                    OperatorID = entry.OperatorID,
                    ProactiveAnswered = entry.ProactiveAnswered ?? 0,
                    ProactiveSent = entry.ProactiveSent ?? 0,
                    ProactiveResponseRate = entry.ProactiveSent > 0 ? ((float)entry.ProactiveAnswered / (float)entry.ProactiveSent).ToString("P0") : "-",
                    ReactiveAnswered = entry.ReactiveAnswered ?? 0,
                    ReactiveReceived = entry.ReactiveReceived ?? 0,
                    ReactiveResponseRate = entry.ReactiveReceived > 0 ? ((float)entry.ReactiveAnswered / (float)entry.ReactiveReceived).ToString("P0") : "-",
                    TotalChatLength = new TimeSpan(0, 0, entry.TotalChatLength ?? 0).ToString("g"),
                    AverageChatLength = (entry.TotalChatLength != null && entry.TotalChats != null) ? new TimeSpan(0, 0, (int)entry.TotalChatLength / (int)entry.TotalChats).ToString("g") : "0"
                };

        }
    }
}
