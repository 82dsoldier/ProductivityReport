using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data {
	public class Visitor {
		public int VisitorID { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string Browser { get; set; }
		public string Device { get; set; }
		public string IPAddress { get; set; }
		public virtual ICollection<Conversation> Conversations { get; set; }
	}
}
