using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Text;

namespace ProductivityReport.Data
{
    public class ProductivityReportService : IProductivityReportService
    {
        private readonly ProductivityReportContext _context;
        public ProductivityReportService(ProductivityReportContext context)
        {
            _context = context;
        }

        public IEnumerable<ProductivityReportLine> GetReport(DateTime? startDate, DateTime? endDate, string webSite, string device)
        {
            var startDateParam = startDate == null ? new SqlParameter("@StartDate", DBNull.Value) : new SqlParameter("@StartDate", startDate);
            var endDateParam = endDate == null ? new SqlParameter("@EndDate", DBNull.Value) : new SqlParameter("@EndDate", endDate);
            var webSiteParam = String.IsNullOrEmpty(webSite) ? new SqlParameter("@Website", DBNull.Value) : new SqlParameter("@Website", webSite);
            var deviceParam = String.IsNullOrEmpty(device) ? new SqlParameter("@Device", DBNull.Value) : new SqlParameter("@Device", device);
            var entries = _context.ProductivityReportView.FromSql("exec ProductivityReport @StartDate, @EndDate, @Website, @Device", startDateParam, endDateParam, webSiteParam, deviceParam);
#pragma warning disable IDE0059 // Unnecessary assignment of a value
            var retVal = new List<ProductivityReportLine>();
#pragma warning restore IDE0059 // Unnecessary assignment of a value
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
                    AverageChatLength = (entry.TotalChatLength != null && entry.TotalChats != null  && entry.TotalChats > 0) ? new TimeSpan(0, 0, (int)entry.TotalChatLength / (int)entry.TotalChats).ToString("g") : "0"
                };

        }
    }
}
