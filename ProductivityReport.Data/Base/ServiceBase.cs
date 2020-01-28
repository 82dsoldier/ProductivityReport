using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ProductivityReport.Data {
	public abstract class ServiceBase<T> : IServiceBase<T>
		where T: class {
		
		protected ProductivityReportContext _context;

		public ServiceBase(ProductivityReportContext context) {
			_context = context;
		}
		public void Add(T obj) {
			_context.Set<T>().Add(obj);
			_context.SaveChanges();
		}

		public void Update(T obj) {
			_context.Set<T>().Update(obj);
			_context.SaveChanges();
		}

		public void Remove(T obj) {
			_context.Set<T>().Remove(obj);
			_context.SaveChanges();
		}

		public abstract T Get(int id);
	}
}
