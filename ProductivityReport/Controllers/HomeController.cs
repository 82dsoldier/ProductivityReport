using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using ProductivityReport.Models;

namespace ProductivityReport.Controllers {
	public class HomeController : Controller {

		[HttpGet]
		public IActionResult Index() {
			ViewBag.Message = "Operator Productivity Report";
			var ProductivityReport = new OperatorReportItems {
				OperatorProductivity = GetReport(null, null, String.Empty, String.Empty),
				PredefinedFilterOptions = GetListItems(String.Empty),
				Websites = GetWebsites(String.Empty).ToList(),
				Devices = GetDevices(String.Empty).ToList()
			};
			return View(ProductivityReport);
		}

		[HttpPost]
		public IActionResult Index(DateTime? startDate, DateTime? endDate, string predefinedFilter, string filterType, string webSite, string device) {
			ViewBag.Message = "Operator Productivity Report";
			var ProductivityReport = new OperatorReportItems {
				OperatorProductivity = GetReport(startDate, endDate, webSite, device),
				StartDate = startDate,
				EndDate = endDate,
				FilterType = filterType,
				PredefinedFilterOptions = GetListItems(predefinedFilter),
				Websites = GetWebsites(webSite).ToList(),
				Devices = GetDevices(device).ToList()
			};
			return View(ProductivityReport);
		}

		public IActionResult New_Index() {
			return View();
		}

		private List<SelectListItem> GetListItems(string predefinedFilter) {
			return new List<SelectListItem> {
				new SelectListItem("Today", "1", predefinedFilter=="1"),
				new SelectListItem("Yesterday", "2", predefinedFilter=="2"),
				new SelectListItem("This Week", "3", predefinedFilter=="3"),
				new SelectListItem("Last Week", "4", predefinedFilter=="4"),
				new SelectListItem("This Month", "5", predefinedFilter=="5"),
				new SelectListItem("Last Month", "6", predefinedFilter=="6"),
				new SelectListItem("This Year", "7", predefinedFilter=="7"),
				new SelectListItem("Last Year", "8", predefinedFilter=="8"),
				};
		}
		//TODO:  Put the connection string in a config file rather than hard coded
		private IEnumerable<OperatorReportViewModel> GetReport(DateTime? startDate, DateTime? endDate, string webSite, string device) {
			SqlConnection conn = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=chat;User id=chat;Password=chat;Pooling=false");
			SqlCommand sqlcomm = new SqlCommand("ProductivityReport", conn) {
				CommandType = CommandType.StoredProcedure
			};
			if (startDate != null)
				sqlcomm.Parameters.Add(new SqlParameter("@StartDate", startDate));
			else
				sqlcomm.Parameters.Add(new SqlParameter("@StartDate", DBNull.Value));

			if (endDate != null)
				sqlcomm.Parameters.Add(new SqlParameter("@EndDate", endDate));
			else
				sqlcomm.Parameters.Add(new SqlParameter("@EndDate", DBNull.Value));

			if (String.IsNullOrEmpty(webSite))
				sqlcomm.Parameters.Add(new SqlParameter("@Website", DBNull.Value));
			else
				sqlcomm.Parameters.Add(new SqlParameter("@Website", webSite));

			if (String.IsNullOrEmpty(device))
				sqlcomm.Parameters.Add(new SqlParameter("@Device", DBNull.Value));
			else
				sqlcomm.Parameters.Add(new SqlParameter("@Device", device));

			conn.Open();
			SqlDataReader dr = sqlcomm.ExecuteReader();
			while (dr.Read()) {
				var averageChatLengthTime = dr["TotalChats"] != DBNull.Value && Convert.ToInt32(dr["TotalChats"]) != 0 ? new TimeSpan(0, 0, Convert.ToInt32(dr["TotalChatLength"]) / Convert.ToInt32(dr["TotalChats"])) : TimeSpan.MinValue;
				var averageChatLength = new StringBuilder();
				if (averageChatLengthTime > TimeSpan.MinValue) {
					if (averageChatLengthTime.Days > 0)
						averageChatLength.AppendFormat(@"{0:%d}d ", averageChatLengthTime);
					if (averageChatLengthTime.Hours > 0)
						averageChatLength.AppendFormat(@"{0:%h}h ", averageChatLengthTime);
					if (averageChatLengthTime.Minutes > 0)
						averageChatLength.AppendFormat(@"{0:%m}m ", averageChatLengthTime);
				}
				var totalChatLengthTime = dr["TotalChatLength"] != DBNull.Value && Convert.ToInt32(dr["TotalChatLength"]) != 0 ? new TimeSpan(0, 0, Convert.ToInt32(dr["TotalChatLength"])) : TimeSpan.MinValue;
				var totalChatLength = new StringBuilder();
				if (totalChatLengthTime > TimeSpan.MinValue) {
					if (totalChatLengthTime.Days > 0)
						totalChatLength.AppendFormat(@"{0:%d}d ", totalChatLengthTime);
					if (totalChatLengthTime.Hours > 0)
						totalChatLength.AppendFormat(@"{0:%h}h ", totalChatLengthTime);
					if (totalChatLengthTime.Minutes > 0)
						totalChatLength.AppendFormat(@"{0:%m}m ", totalChatLengthTime);
				}

				var opVM = new Models.OperatorReportViewModel {
					ID = Convert.ToInt32(dr["OperatorID"]),
					Name = Convert.ToString(dr["Name"]),
					ProactiveAnswered = Convert.ToInt32(dr["ProactiveAnswered"] != DBNull.Value ? dr["ProactiveAnswered"] : 0),
					ProactiveSent = Convert.ToInt32(dr["ProactiveSent"] != DBNull.Value ? dr["ProactiveSent"] : 0),
					ProactiveResponseRate = dr["ProactiveSent"] != DBNull.Value ? (Convert.ToDecimal(dr["ProactiveAnswered"]) / Convert.ToDecimal(dr["ProactiveSent"])).ToString("P0") : "-",
					ReactiveAnswered = Convert.ToInt32(dr["ReactiveAnswered"] != DBNull.Value ? dr["ReactiveAnswered"] : 0),
					ReactiveReceived = Convert.ToInt32(dr["ReactiveReceived"] != DBNull.Value ? dr["ReactiveReceived"] : 0),
					ReactiveResponseRate = dr["ReactiveAnswered"] != DBNull.Value ? (Convert.ToDecimal(dr["ReactiveAnswered"]) / Convert.ToDecimal(dr["ReactiveReceived"])).ToString("P0") : "-",
					AverageChatLength = averageChatLength.ToString(),
					TotalChatLength = totalChatLength.ToString()
				};
				yield return opVM;
			}
			conn.Close();
		}

		private IEnumerable<SelectListItem> GetWebsites(string selectedWebsite) {
			SqlConnection conn = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=chat;User id=chat;Password=chat;Pooling=false");
			SqlCommand sqlcomm = new SqlCommand("SELECT DISTINCT (Website) FROM Conversations", conn);
			conn.Open();
			SqlDataReader dr = sqlcomm.ExecuteReader();
			while (dr.Read()) {
				var website = dr["Website"].ToString();
				yield return new SelectListItem {
					Text = website,
					Value = website,
					Selected = website == selectedWebsite
				};
			}
			conn.Close();
		}

		private IEnumerable<SelectListItem> GetDevices(string selectedDevice) {
			SqlConnection conn = new SqlConnection(@"Data Source=(localdb)\MSSQLLocalDB;Initial Catalog=chat;User id=chat;Password=chat;Pooling=false");
			SqlCommand sqlcomm = new SqlCommand("SELECT DISTINCT (Device) FROM Visitors", conn);
			conn.Open();
			SqlDataReader dr = sqlcomm.ExecuteReader();
			while (dr.Read()) {
				var device = dr["Device"].ToString();
				yield return new SelectListItem {
					Text = device,
					Value = device,
					Selected = device == selectedDevice
				};
			}
			conn.Close();
		}

	}
}
