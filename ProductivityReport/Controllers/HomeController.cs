using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ProductivityReport.Models;

namespace ProductivityReport.Controllers {
	public class HomeController : Controller {
		public IActionResult Index() {
			return View();
		}

		public IActionResult Privacy() {
			return View();
		}

		[ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
		public IActionResult Error() {
			return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
		}

        [HttpGet]
        public ActionResult OperatorReport()
        {
            ViewBag.Message = "Operator Productivity Report";
            var ProductivityReport = new OperatorReportItems();
            ProductivityReport.OperatorProductivity = GetReport(null, null);
            return View(ProductivityReport);
        }

        [HttpPost]
        public ActionResult OperatorReport(DateTime? startDate, DateTime? endDate)
        {
            ViewBag.Message = "Operator Productivity Report";
            var ProductivityReport = new OperatorReportItems();
            ProductivityReport.OperatorProductivity = GetReport(startDate, endDate);
            ProductivityReport.StartDate = startDate;
            ProductivityReport.EndDate = endDate;
            return View(ProductivityReport);
        }

        private IEnumerable<OperatorReportViewModel> GetReport(DateTime? startDate, DateTime? endDate)
        {
            SqlConnection conn = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=chat;User id=chat;Password=chat;Pooling=false");
            SqlCommand sqlcomm = new SqlCommand("ProductivityReportProc", conn);
            sqlcomm.CommandType = CommandType.StoredProcedure;
            if (startDate != null)
                sqlcomm.Parameters.Add(new SqlParameter("@StartDate", startDate));
            else
                sqlcomm.Parameters.Add(new SqlParameter("@StartDate", DBNull.Value));

            if (endDate != null)
                sqlcomm.Parameters.Add(new SqlParameter("@EndDate", endDate));
            else
                sqlcomm.Parameters.Add(new SqlParameter("@EndDate", DBNull.Value));

            conn.Open();
            SqlDataReader dr = sqlcomm.ExecuteReader();
            while (dr.Read())
            {
                OperatorReportViewModel opVM = new Models.OperatorReportViewModel();
                opVM.ID = Convert.ToInt32(dr["OperatorID"]);
                opVM.Name = Convert.ToString(dr["Name"]);
                opVM.ProactiveAnswered = Convert.ToInt32(dr["ProactiveAnswered"] != DBNull.Value ? dr["ProactiveAnswered"] : 0);
                opVM.ProactiveSent = Convert.ToInt32(dr["ProactiveSent"] != DBNull.Value ? dr["ProactiveSent"] : 0);
                opVM.ProactiveResponseRate = dr["ProactiveSent"] != DBNull.Value ? (Convert.ToDecimal(dr["ProactiveAnswered"]) / Convert.ToDecimal(dr["ProactiveSent"])).ToString("P0") : "-";
                opVM.ReactiveAnswered = Convert.ToInt32(dr["ReactiveAnswered"] != DBNull.Value ? dr["ReactiveAnswered"] : 0);
                opVM.ReactiveReceived = Convert.ToInt32(dr["ReactiveReceived"] != DBNull.Value ? dr["ReactiveReceived"] : 0);
                opVM.ReactiveResponseRate = dr["ReactiveAnswered"] != DBNull.Value ? (Convert.ToDecimal(dr["ReactiveAnswered"]) / Convert.ToDecimal(dr["ReactiveReceived"])).ToString("P0") : "-";
                opVM.AverageChatLength = dr["TotalChats"] != DBNull.Value ? new TimeSpan(0, 0, Convert.ToInt32(dr["TotalChatLength"]) / Convert.ToInt32(dr["TotalChats"])).ToString("g") : "";
                opVM.TotalChatLength = dr["TotalChatLength"] != DBNull.Value ? new TimeSpan(0, 0, Convert.ToInt32(dr["TotalChatLength"])).ToString("g") : "";
                yield return opVM;
            }
        }
    }
}
