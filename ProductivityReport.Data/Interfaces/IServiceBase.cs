using System;
using System.Collections.Generic;
using System.Text;

namespace ProductivityReport.Data
{
    public interface IServiceBase<T>
    {
		void Add(T obj);

		void Update(T obj);

		void Remove(T obj);

		T Get(int id);
	}
}
