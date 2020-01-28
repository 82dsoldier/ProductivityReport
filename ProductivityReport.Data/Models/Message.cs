using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data {
	public class Message {
		public int MessageID { get; set; }
		public int ConversationID { get; set; }
		public string MessageText { get; set; }
		public string MessageFrom { get; set; }
		public int MessageUserID { get; set; }
		public DateTime MessageDate { get; set; }
		public virtual Conversation Conversation { get; set; }
	}
}
