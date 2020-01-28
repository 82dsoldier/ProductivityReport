using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data {
	public class ServiceBase<T>
		where T: class {
		
		private ProductivityReportContext _context;

		public ServiceBase(ProductivityReportContext context) {
			_context = context;
		}
		public void Create(T obj) {
			_context.Set<T>().Add(obj);
			_context.SaveChanges();
		}

		public void Edit(T obj) {

		}

		public void Delete(int id) {

		}

		public T Get(int id) {

		}

		public IEnumerable<T> Get() {

		}
	}
}
