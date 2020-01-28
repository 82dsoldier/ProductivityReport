using Microsoft.AspNetCore.Mvc;
using ProductivityReport.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProductivityReport.Base
{
    public class ApiControllerBase<TService, TType> : Controller
        where TService : IServiceBase<TType>
    {
        protected TService _dataService;

        public ApiControllerBase(TService dataService)
        {
            _dataService = dataService;
        }

        [HttpGet]
        public IActionResult Get(int id) => new JsonResult(_dataService.Get(id));

        [HttpPost]
        public IActionResult Post(TType obj)
        {
            _dataService.Add(obj);
            return CreatedAtAction(nameof(Get), obj);
        }

        [HttpPut]
        public IActionResult Put(TType obj)
        {
            _dataService.Update(obj);
            return new OkResult();
        }

        [HttpDelete]
        public IActionResult Delete(TType obj)
        {
            _dataService.Remove(obj);
            return new OkResult();
        }
    }
}
