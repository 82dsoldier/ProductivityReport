using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data {
	public class Operator {
		public int OperatorID { get; set; }
		public string Name { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public virtual ICollection<Conversation> Conversations { get; set; }
	}
}
