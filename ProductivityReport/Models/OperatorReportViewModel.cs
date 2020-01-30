using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProductivityReport.Models
{
    public class OperatorReportViewModel
    {
        public int ID { get; set; }
        public string Name { get; set;}
        public int ProactiveSent { get; set; }
        public int ProactiveAnswered { get; set; }
        public string ProactiveResponseRate { get; set; }
        public int ReactiveReceived { get; set; }
        public int ReactiveAnswered { get; set; }
        public string ReactiveResponseRate { get; set; }
        public string TotalChatLength { get; set; }
        public string AverageChatLength { get; set; }
    }

    public class OperatorReportItems
    {
        public IEnumerable<OperatorReportViewModel> OperatorProductivity { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public int FilterType { get; set; }
        public string PredefinedFilter { get; set; }

    }
}