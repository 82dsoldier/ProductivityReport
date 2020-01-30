using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data
{
    public class ProductivityReportLine
    {
        public int OperatorID { get; set; }
        public string Name { get; set; }
        public int ProactiveSent { get; set; }
        public int ProactiveAnswered { get; set; }
        public string ProactiveResponseRate { get; set; }
        public int ReactiveReceived { get; set; }
        public int ReactiveAnswered { get; set; }
        public string ReactiveResponseRate { get; set; }
        public string TotalChatLength { get; set; }
        public string AverageChatLength { get; set; }
    }
}
