using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data
{
    public class ProductivityReportEntry
    {
        public int OperatorID { get; set; }
        public string Name { get; set; }
        public int? ProactiveSent { get; set; }
        public int? ProactiveAnswered { get; set; }
        public int? ReactiveReceived { get; set; }
        public int? ReactiveAnswered { get; set; }
        public int? TotalChatLength { get; set; }
        public int? TotalChats { get; set; }
    }
}
